// For a builder: typechecks one screen and renders it to HTML next to it, to look at in a browser.
// Usage: node scripts/preview.mjs <screen.tsx>
import { execFileSync } from 'node:child_process';
import { writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, resolve, dirname, relative, basename, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './render.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Only a .tsx file inside this repository: the path goes to tsc and render.mjs.
const file = resolve(root, process.argv[2] || '');
if (!file.startsWith(root + sep) || !file.endsWith('.tsx') || !existsSync(file)) {
  console.error('Usage: node scripts/preview.mjs <screen.tsx>, a .tsx file inside this repository');
  process.exit(1);
}
const dir = dirname(file);
const cfg = join(dir, `.tsconfig.${basename(file)}.json`);
writeFileSync(cfg, JSON.stringify({ extends: relative(dir, join(root, 'tsconfig.json')), include: [basename(file)], exclude: [], compilerOptions: { typeRoots: [join(root, 'node_modules/@types')] } }));
let out = '';
try { execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', cfg], { cwd: dir, encoding: 'utf8' }); }
catch (e) { out = `${e.stdout || ''}${e.stderr || ''}`; }
rmSync(cfg, { force: true });
console.log(out.trim() ? `TypeScript errors:\n${out.trim()}` : 'Compiles.');
if (await render([file])) process.exitCode = 1;
