#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const auditTool = path.resolve(currentDir, '../tools/offline-audit.mjs');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'a01-offline-audit-'));

try {
  const fixture = path.join(tempDir, 'fixture.html');
  const source = `<!doctype html>
<script type="importmap">{"imports":{"three":"https://cdn.example.test/three.js"}}</script>
<script type="module">await import('three')</script>
<script src="./missing-local-module.js"></script>
<script>fetch('https://eva.example.test/site')</script>
<a href="./docs.html">docs</a>`;
  fs.writeFileSync(fixture, source, 'utf8');

  const result = spawnSync(process.execPath, [auditTool, fixture], { encoding: 'utf8' });
  assert.equal(result.status, 1, 'an offline-blocking fixture must fail');
  const report = JSON.parse(result.stdout);
  assert.equal(report.singleHtmlStaticStatus, 'FAIL');
  assert.ok(report.singleHtmlBlockers.some(x => x.includes('remote import-map target')));
  assert.ok(report.singleHtmlBlockers.some(x => x.includes('missing local script')));
  assert.deepEqual(report.remoteFetches, ['https://eva.example.test/site']);
  assert.ok(report.relativeHtmlRefs.includes('./docs.html'));
  console.log('offline-audit-check: PASS');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
