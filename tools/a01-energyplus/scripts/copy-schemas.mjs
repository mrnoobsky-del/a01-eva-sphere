import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'node_modules/@idfkit/schemas/data');
const to = resolve(root, 'public/schemas');

mkdirSync(dirname(to), { recursive: true });
cpSync(from, to, { recursive: true });
console.log(`EnergyPlus schemas copied to ${to}`);
