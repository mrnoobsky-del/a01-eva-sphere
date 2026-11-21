import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(appRoot, '../..');
const source = resolve(repoRoot, 'geometry/a01-shell-parameters-v0.1.json');
const destinationDir = resolve(appRoot, 'public/geometry');

mkdirSync(destinationDir, { recursive: true });
copyFileSync(source, resolve(destinationDir, 'a01-shell-parameters-v0.1.json'));
console.log('Canonical A-01 shell parameters staged.');
