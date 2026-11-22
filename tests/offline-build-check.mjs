#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
if (!target || !fs.existsSync(target)) throw new Error('Built HTML not found');
const html = fs.readFileSync(target, 'utf8');

assert.ok(html.includes('id="a01-offline-engine"'), 'embedded engine bundle is required');
assert.ok(html.includes('name="a01-offline-build" content="3.3.0"'), 'offline build marker is required');
assert.ok(!/cdn\.jsdelivr\.net\/npm\/three/i.test(html), 'Three.js CDN dependency must be removed');
assert.ok(!/<script\b[^>]*\bsrc=["']https?:/i.test(html), 'No external script src is allowed');
assert.ok(!/<script\b[^>]*\bsrc=["']\.\/modules\/living-world\//i.test(html), 'No missing relative companion scripts are allowed');
assert.ok(!/<script\s+type=["']importmap["']/i.test(html), 'Import map must be removed');
assert.ok(!/await\s+import\(['"]three(?:\/|['"])/.test(html), 'Main scene must not dynamically import Three.js');
assert.ok(html.includes('const { THREE, OrbitControls } = globalThis.__A01_OFFLINE_ENGINE__;'), 'Main scene must use embedded engine');
assert.ok(html.includes('const pageData='), 'Embedded documentation/registry payload must be preserved');
assert.ok(html.includes('offvibe-bot.mrnoobsky.workers.dev/site'), 'Online Eva adapter endpoint should remain optional');

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
assert.deepEqual([...new Set(duplicates)], [], 'HTML IDs must remain unique');
assert.ok(Buffer.byteLength(html, 'utf8') > 1_000_000, 'Build should retain the full A-01 source content');

const manifestPath = target + '.manifest.json';
assert.ok(fs.existsSync(manifestPath), 'build manifest is required');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.equal(manifest.version, '3.3.0');
assert.equal(manifest.engine.three, '0.185.0');
assert.equal(manifest.mandatoryRuntimeNetworkRequests, 0);

console.log(JSON.stringify({
  result: 'PASS',
  bytes: Buffer.byteLength(html, 'utf8'),
  uniqueIds: new Set(ids).size,
  manifest: manifestPath
}, null, 2));
