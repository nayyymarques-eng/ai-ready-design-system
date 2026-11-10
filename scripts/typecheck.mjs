// Typechecks each React screen in a folder on its own, and writes <folder>/typecheck.json
// ({ "<name>.tsx": { "errors": [...] } }). The harness reads it for TSC-01.
// Usage: node scripts/typecheck.mjs <folder or .tsx file> [...]
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync, rmSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tsc = join(root, 'node_modules/.bin/tsc');
// A path from the command line must stay inside this repository.
const inRepo = p => { const r = resolve(root, p); if (r !== root && !r.startsWith(root + sep)) { console.error(`${p} is outside this repository`); process.exit(1); } return r; };
for (const target of process.argv.slice(2).map(inRepo)) {
  const isFile = statSync(target).isFile();
  const dir = isFile ? dirname(resolve(target)) : resolve(target);
  const files = isFile ? [resolve(target).slice(dir.length + 1)] : readdirSync(dir).filter(f => f.endsWith('.tsx')).sort();
  const json = join(dir, 'typecheck.json');
  const result = isFile && existsSync(json) ? JSON.parse(readFileSync(json, 'utf8')) : {};
  for (const file of files) {
    const cfg = join(dir, `.tsconfig.${file}.json`);
    writeFileSync(cfg, JSON.stringify({ extends: relative(dir, join(root, 'tsconfig.json')), include: [file], exclude: [], compilerOptions: { typeRoots: [join(root, 'node_modules/@types')] } }));
    let out = '';
    try { execFileSync(tsc, ['-p', cfg], { cwd: dir, encoding: 'utf8' }); }
    catch (e) { out = `${e.stdout || ''}${e.stderr || ''}`; }
    rmSync(cfg, { force: true });
    const errors = out.split('\n').filter(l => /error TS\d+/.test(l)).map(l => l.replace(/^.*?error /, ''));
    result[file] = { errors };
    console.log(`  ${relative(root, join(dir, file))}  ${errors.length ? errors.length + ' errors' : 'ok'}`);
  }
  writeFileSync(json, JSON.stringify(result, null, 2));
}
