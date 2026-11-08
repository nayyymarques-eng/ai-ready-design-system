// Writes the two design system folders the eval's builders get:
//   eval/components-only/  tokens, components and the catalogue. No rules, no contracts, no NewPart.
//   eval/framework/        tokens, components, AGENTS.md, rules, decision map and contracts.
// Both hold the same React components in src/. Builders write to <folder>/run-<n>/.
// Usage: node scripts/make-eval.mjs
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const at = (...p) => join(root, ...p);

function system(name, files, { stripContracts }) {
  const dir = at('eval', name);
  for (const f of ['src', ...files]) rmSync(join(dir, f), { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const f of files) cpSync(f.startsWith('eval/') ? at(f) : at(f), join(dir, f.replace(/^eval\//, '')), { recursive: true });
  cpSync(at('src'), join(dir, 'src'), { recursive: true });
  if (stripContracts) {
    rmSync(join(dir, 'src/components/NewPart.tsx'));
    const idx = join(dir, 'src/index.ts');
    writeFileSync(idx, readFileSync(idx, 'utf8').split('\n').filter(l => !l.includes('NewPart')).join('\n'));
    for (const f of readdirSync(join(dir, 'src/components'))) {
      const p = join(dir, 'src/components', f);
      writeFileSync(p, readFileSync(p, 'utf8').replace(/ Contract: contracts\/[a-z-]+\.md/g, ''));
    }
  }
  console.log(`  eval/${name}/`);
}

system('components-only', ['tokens.css', 'components.css', 'eval/catalogue.md'], { stripContracts: true });
system('framework', ['tokens.css', 'components.css', 'AGENTS.md', 'rules.md', 'decision-map.md', 'contracts'], { stripContracts: false });
