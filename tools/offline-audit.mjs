#!/usr/bin/env node
/**
 * A-01 offline dependency audit.
 * Usage: node tools/offline-audit.mjs path/to/app.html [report.json]
 *
 * This is a static source audit. It does not replace a browser run with the
 * network disabled and cannot discover every computed/dynamic resource URL.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node tools/offline-audit.mjs <html-file> [report.json]');
  process.exit(2);
}

const htmlPath = path.resolve(input);
if (!fs.existsSync(htmlPath)) {
  console.error(`HTML file not found: ${htmlPath}`);
  process.exit(2);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const root = path.dirname(htmlPath);
const importMapMatches = [...html.matchAll(/<script\s+type=["']importmap["']\s*>([\s\S]*?)<\/script>/gi)];
const importMaps = [];
for (const match of importMapMatches) {
  try {
    importMaps.push(JSON.parse(match[1]));
  } catch (error) {
    importMaps.push({ __parseError: String(error) });
  }
}

const mappedImports = [];
for (const map of importMaps) {
  for (const [specifier, target] of Object.entries(map.imports ?? {})) {
    mappedImports.push({ specifier, target, remote: /^https?:\/\//i.test(target) });
  }
}

const scriptTags = [...html.matchAll(/<script\b([^>]*)>/gi)].map(match => match[1]);
const scriptSources = scriptTags
  .map(attrs => attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1])
  .filter(Boolean)
  .map(src => {
    const remote = /^https?:\/\//i.test(src);
    const absolute = remote || /^(data:|blob:)/i.test(src);
    const resolved = absolute ? null : path.resolve(root, src.split(/[?#]/, 1)[0]);
    return {
      src,
      remote,
      local: !absolute,
      exists: resolved ? fs.existsSync(resolved) : null,
      resolved
    };
  });

const remoteFetches = [...new Set(
  [...html.matchAll(/\bfetch\s*\(\s*["'](https?:\/\/[^"']+)["']/gi)].map(m => m[1])
)];

const relativeHtmlRefs = [...new Set(
  [...html.matchAll(/["'](\.\/[a-z0-9_./-]+\.html(?:#[^"']*)?)["']/gi)].map(m => m[1])
)];

const cssImports = [...new Set(
  [...html.matchAll(/@import\s+(?:url\()?["']?(https?:\/\/[^\s"')]+)["']?\)?/gi)].map(m => m[1])
)];

const externalUrls = [...new Set(
  [...html.matchAll(/https?:\/\/[^\s"'<>\])}]+/gi)].map(m => m[0].replace(/[.,;]+$/, ''))
)];

const report = {
  audit: 'A-01 static offline dependency audit',
  file: htmlPath,
  bytes: Buffer.byteLength(html, 'utf8'),
  importMaps: importMaps.length,
  mappedImports,
  scriptSources,
  remoteFetches,
  relativeHtmlRefs,
  cssImports,
  externalUrls,
  storage: {
    localStorageReferences: (html.match(/\blocalStorage\b/g) ?? []).length,
    indexedDBReferences: (html.match(/\bindexedDB\b/g) ?? []).length
  },
  limitations: [
    'Static source analysis only; dynamically computed URLs may not be discovered.',
    'Does not confirm browser file:// module behaviour or persistence.',
    'Does not prove WebGL rendering or visual correctness.'
  ]
};

const blockers = [
  ...mappedImports.filter(item => item.remote).map(item => `remote import-map target: ${item.specifier} -> ${item.target}`),
  ...scriptSources.filter(item => item.remote).map(item => `remote script src: ${item.src}`),
  ...scriptSources.filter(item => item.local && !item.exists).map(item => `missing local script: ${item.src}`),
  ...scriptSources.filter(item => item.local && item.exists).map(item => `external local script prevents true single-file output: ${item.src}`),
  ...cssImports.map(url => `remote CSS import: ${url}`)
];

report.singleHtmlBlockers = blockers;
report.singleHtmlStaticStatus = blockers.length ? 'FAIL' : 'PASS_STATIC_ONLY';

const json = JSON.stringify(report, null, 2);
const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : null;
if (outputPath) fs.writeFileSync(outputPath, json + '\n', 'utf8');
console.log(json);
if (blockers.length) {
  console.error(`\nSingle HTML static audit found ${blockers.length} blocker(s).`);
  process.exitCode = 1;
} else {
  console.error('\nStatic checks passed. Browser offline acceptance is still required.');
}
