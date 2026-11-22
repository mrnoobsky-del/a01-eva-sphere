import fs from 'node:fs';
import assert from 'node:assert/strict';

const htmlPath = process.argv[2];
if (!htmlPath) {
  console.error('Usage: node offline-engine-check.mjs <path-to-v3.2.0-html>');
  process.exit(2);
}
const html = fs.readFileSync(htmlPath, 'utf8');

assert.match(html, /"three":"\.\/vendor\/three\/build\/three\.module\.js"/);
assert.match(html, /"three\/addons\/":"\.\/vendor\/three\/examples\/jsm\/" /);
assert.doesNotMatch(html, /cdn\.jsdelivr\.net\/npm\/three/);
assert.match(html, /Не удалось загрузить локальный 3D-движок/);

console.log('PASS: local import map, no runtime Three.js CDN, local engine failure message present');
