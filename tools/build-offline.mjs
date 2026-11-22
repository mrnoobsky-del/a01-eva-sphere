#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';

const [sourceArg, outputArg] = process.argv.slice(2);
if (!sourceArg || !outputArg) {
  console.error('Usage: node tools/build-offline.mjs <source.html> <output.html>');
  process.exit(2);
}
const sourcePath = path.resolve(sourceArg);
const outputPath = path.resolve(outputArg);
if (!fs.existsSync(sourcePath)) throw new Error('Source HTML not found: ' + sourcePath);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

let html = fs.readFileSync(sourcePath, 'utf8');
const originalSha256 = createHash('sha256').update(html).digest('hex');

const engineEntry = [
  "import * as THREE from 'three';",
  "import { OrbitControls } from 'three/addons/controls/OrbitControls.js';",
  'globalThis.__A01_OFFLINE_ENGINE__ = { THREE, OrbitControls };'
].join('\n');

const engineBuild = await build({
  stdin: {
    contents: engineEntry,
    resolveDir: process.cwd(),
    sourcefile: 'a01-offline-engine-entry.js',
    loader: 'js'
  },
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2022'],
  minify: true,
  legalComments: 'inline',
  write: false,
  metafile: true
});
const engineBundle = engineBuild.outputFiles.find(file => file.path.endsWith('.js'))?.text;
if (!engineBundle) throw new Error('esbuild did not produce the offline engine bundle');

const scriptMatches = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
const appModule = scriptMatches.find(match =>
  /\btype\s*=\s*["']module["']/i.test(match[1]) &&
  match[2].includes("await import('three')") &&
  match[2].includes('OrbitControls')
);
if (!appModule) throw new Error('Could not identify the A-01 main 3D module');

const originalModule = appModule[2];
const threeImportPattern = /const\s+THREE\s*=\s*await\s+import\(['"]three['"]\)\s*;\s*const\s*\{\s*OrbitControls\s*\}\s*=\s*await\s+import\(['"]three\/addons\/controls\/OrbitControls\.js['"]\)\s*;/;
if (!threeImportPattern.test(originalModule)) {
  throw new Error('Expected Three.js / OrbitControls import pair was not found');
}
const rewrittenModule = originalModule.replace(
  threeImportPattern,
  'const { THREE, OrbitControls } = globalThis.__A01_OFFLINE_ENGINE__;'
);
if (/\bimport\s*\(/.test(rewrittenModule) || /\bimport\s+[\s\S]{0,100}?\sfrom\s*['"]/.test(rewrittenModule)) {
  throw new Error('A runtime import remains in the main module after rewriting');
}
html = html.replace(appModule[0], appModule[0].replace(originalModule, rewrittenModule));

const importMapPattern = /<script\s+type=["']importmap["']\s*>[\s\S]*?<\/script>/i;
if (!importMapPattern.test(html)) throw new Error('Expected Three.js import map was not found');
html = html.replace(importMapPattern, '<!-- Import map removed: runtime is bundled below. -->');

const optionalModules = ['companion-motion.js', 'companion-ai.js', 'companions.js'];
const optionalMissing = [];
for (const fileName of optionalModules) {
  const relativeSrc = './modules/living-world/' + fileName;
  const escapedSrc = relativeSrc.replaceAll('.', '\\.');
  const tagPattern = new RegExp(
    "<script\\b(?=[^>]*\\bsrc=[\"']" + escapedSrc + "[\"'])[^>]*>\\s*<\\/script>",
    'i'
  );
  const candidates = [
    path.resolve(path.dirname(sourcePath), 'modules/living-world', fileName),
    path.resolve(process.cwd(), 'modules/living-world', fileName)
  ];
  const modulePath = candidates.find(candidate => fs.existsSync(candidate));
  if (modulePath) {
    const contents = fs.readFileSync(modulePath, 'utf8');
    const safeContents = contents.replace(/<\/script/gi, '<\\/script');
    html = html.replace(tagPattern, '<script data-a01-inlined-module="' + fileName + '">' + safeContents + '</script>');
  } else {
    optionalMissing.push(fileName);
    html = html.replace(tagPattern, '<!-- Optional Living World module unavailable in source package: ' + fileName + ' -->');
  }
}

const safeBundle = engineBundle.replace(/<\/script/gi, '<\\/script');
const threeLicensePath = path.resolve(process.cwd(), 'node_modules/three/LICENSE');
if (!fs.existsSync(threeLicensePath)) throw new Error('Three.js LICENSE file is missing from installed dependency');
const threeLicense = fs.readFileSync(threeLicensePath, 'utf8');
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const licenseTemplate = '<template id="a01-third-party-notices"><pre>' + escapeHtml('Three.js r185 / OrbitControls — MIT License\\n\\n' + threeLicense) + '</pre></template>\\n';
html = html.replace('</body>', licenseTemplate + '</body>');
const engineScript = '<script id="a01-offline-engine" data-three-version="0.185.0">\\n' + safeBundle + '\\n</script>\\n';
const moduleOpenPattern = /<script\b(?=[^>]*\btype=["']module["'])[^>]*>/i;
if (!moduleOpenPattern.test(html)) throw new Error('Main module opening tag disappeared');
html = html.replace(moduleOpenPattern, match => engineScript + match);

html = html.replace(/v3\.2\.[12]/g, 'v3.3.0');
html = html.replace(
  'Не удалось загрузить 3D-движок. Эта одиночная HTML-версия загружает Three.js r185 с jsDelivr, поэтому при открытии файла требуется интернет. Проверь доступность cdn.jsdelivr.net.',
  'Не удалось запустить встроенный 3D-движок. Проверь поддержку WebGL и ошибки в консоли браузера.'
);
html = html.replace(
  'Не удалось загрузить Three.js r185 с jsDelivr. Проверь подключение к интернету и доступность cdn.jsdelivr.net.',
  'Не удалось запустить встроенный 3D-движок. Проверь поддержку WebGL и ошибки в консоли браузера.'
);
const offlineMeta = '<meta name="a01-offline-build" content="3.3.0"><meta name="a01-three-version" content="0.185.0">';
html = html.replace('</head>', offlineMeta + '\n</head>');

if (/cdn\.jsdelivr\.net\/npm\/three/i.test(html)) throw new Error('Three.js CDN reference remains');
if (/<script\b[^>]*\bsrc=["']\.\/modules\/living-world\//i.test(html)) {
  throw new Error('A relative Living World script tag remains');
}
if (/\bimport\s*\(\s*['"]three(?:\/|['"])/.test(rewrittenModule)) {
  throw new Error('Three.js dynamic import remains');
}

fs.writeFileSync(outputPath, html, 'utf8');
const outputSha256 = createHash('sha256').update(html).digest('hex');
const engineSha256 = createHash('sha256').update(engineBundle).digest('hex');
const manifest = {
  product: 'A-01 Offline Edition',
  version: '3.3.0',
  profile: 'single-html',
  status: 'built; browser acceptance required',
  source: path.relative(process.cwd(), sourcePath).replaceAll('\\', '/'),
  sourceSha256: originalSha256,
  output: path.basename(outputPath),
  outputBytes: Buffer.byteLength(html, 'utf8'),
  outputSha256,
  engine: {
    three: '0.185.0',
    controls: 'OrbitControls from three@0.185.0',
    bundleBytes: Buffer.byteLength(engineBundle, 'utf8'),
    bundleSha256: engineSha256,
    bundler: 'esbuild 0.25.11'
  },
  optionalModulesMissing: optionalMissing,
  networkOptional: [
    'Eva Cloudflare Worker chat: https://offvibe-bot.mrnoobsky.workers.dev/site',
    'outbound website/payment links require connectivity when opened'
  ],
  requiredRuntimeNetworkRequests: 0,
  note: 'Real file:// browser acceptance with the network disabled is required before claiming full offline verification.'
};
fs.writeFileSync(outputPath + '.manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(manifest, null, 2));
