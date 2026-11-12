// Writes the two design system folders the eval's builders get:
//   eval/components-only/  tokens, components and the catalogue. No rules, no contracts, no NewPart.
//   eval/framework/        tokens, components, AGENTS.md, rules, decision map and contracts.
// Both hold the same React components in src/. Builders write to <folder>/run-<n>/.
//   eval/map-instead/      the framework with the decision map of v1.1 (Job | Use | Instead), for the refinement eval.
//   eval/map-never/ is kept as recorded: the same system with the map of v1.0 (Job | Use | Never | Checked by).
// Usage: node scripts/make-eval.mjs [components-only|framework|map-instead]
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const at = (...p) => join(root, ...p);

function system(name, files, { stripContracts }) {
  const dir = at('eval', name);
  for (const f of ['src', ...files]) rmSync(join(dir, f), { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const f of files) cpSync(at(f), join(dir, f.replace(/^eval\//, '')), { recursive: true });
  cpSync(at('src'), join(dir, 'src'), { recursive: true });
  if (stripContracts) {
    rmSync(join(dir, 'src/components/NewPart.tsx'));
    rmSync(join(dir, 'src/templates'), { recursive: true, force: true });
    const idx = join(dir, 'src/index.ts');
    writeFileSync(idx, readFileSync(idx, 'utf8').split('\n').filter(l => !l.includes('NewPart') && !l.includes('/templates/')).join('\n'));
    for (const f of readdirSync(join(dir, 'src/components'))) {
      const p = join(dir, 'src/components', f);
      writeFileSync(p, readFileSync(p, 'utf8').replace(/ Contract: contracts\/[a-z-]+\.md/g, ''));
    }
  }
  console.log(`  eval/${name}/`);
}

// Pass a condition name to write only that folder: node scripts/make-eval.mjs framework
const only = process.argv[2];
if (!only || only === 'components-only') system('components-only', ['tokens.css', 'components.css', 'eval/catalogue.md'], { stripContracts: true });
const framework = ['tokens.css', 'components.css', 'AGENTS.md', 'rules.md', 'decision-map.md', 'contracts'];
if (!only || only === 'framework') system('framework', framework, { stripContracts: false });
if (only === 'map-instead') system('map-instead', framework, { stripContracts: false });
