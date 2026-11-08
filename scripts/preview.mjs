// For a builder: typechecks one screen and renders it to HTML next to it, to look at in a browser.
// Usage: node scripts/preview.mjs <screen.tsx>
import { execFileSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';
import { join, resolve, dirname, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = resolve(process.argv[2] || '');
const dir = dirname(file);
const cfg = join(dir, `.tsconfig.${basename(file)}.json`);
writeFileSync(cfg, JSON.stringify({ extends: relative(dir, join(root, 'tsconfig.json')), include: [basename(file)], exclude: [], compilerOptions: { typeRoots: [join(root, 'node_modules/@types')] } }));
let out = '';
try { execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', cfg], { cwd: dir, encoding: 'utf8' }); }
catch (e) { out = `${e.stdout || ''}${e.stderr || ''}`; }
rmSync(cfg, { force: true });
console.log(out.trim() ? `TypeScript errors:\n${out.trim()}` : 'Compiles.');
try { execFileSync('node', [join(root, 'scripts/render.mjs'), file], { stdio: 'inherit' }); } catch { process.exitCode = 1; }
