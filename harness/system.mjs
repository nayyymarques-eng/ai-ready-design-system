// System checks: run on the design system itself, not on a screen. No browser needed.
//   TOK-01  every var(--name) in components.css is a token in tokens.css
//   COL-03  every text colour in components.css reaches 4.5:1 on its background (3:1 for the large type tokens)
//   NAM-01  a variant has one name: the same word in the React prop, the CSS class and the contract
// Usage: node harness/system.mjs   (exits 1 if a check fails)
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const tokensCss = read('tokens.css');
const css = read('components.css');
const fails = [];
const fail = (id, detail, where) => fails.push(`${id} ${detail}  ← ${where}`);

// Tokens: name → value, with var() references resolved.
const TOKENS = Object.fromEntries([...tokensCss.matchAll(/(--[a-z0-9-]+):([^;]+);/g)].map(m => [m[1], m[2].trim()]));
const resolve = v => { for (let i = 0; i < 9 && /var\(/.test(v); i++) v = v.replace(/var\((--[a-z0-9-]+)(?:,[^)]*)?\)/g, (_, n) => TOKENS[n] ?? 'missing'); return v; };

// TOK-01
const allowed = new Set([...Object.keys(TOKENS), '--value']);
const missing = [...new Set([...css.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)].map(m => m[1]).filter(n => !allowed.has(n)))];
if (missing.length) fail('TOK-01', `components.css uses tokens that don't exist: ${missing.join(' ')}`, 'rules.md');

// COL-03: the text colour of each rule on its background. A rule without one takes it from its base class
// (.btn--primary from .btn); a rule with neither sits on the page grounds: --surface and --surface-sunken.
// Each rule: the text before its { and the declarations up to }. Inside @media, the selector is the part after the media's {.
const rules = css.split('}').map(c => c.split('{')).filter(p => p.length >= 2).flatMap(p => p.at(-2).split(',').map(sel => {
  const decl = p.at(-1);
  const get = p => (decl.match(new RegExp(`(?:^|;)\\s*${p}\\s*:\\s*([^;]+)`)) || [])[1]?.trim();
  return { sel: sel.trim(), color: get('color'), bg: get('background-color') || get('background'), font: get('font') };
}));
const bySel = Object.fromEntries(rules.map(r => [r.sel, r]));
const baseOf = sel => sel.replace(/--[a-z0-9-]+/, '').replace(/\.is-[a-z-]+/, '');
const hex = v => { const m = resolve(v || '').match(/#([0-9a-f]{6})\b/i); return m ? '#' + m[1].toLowerCase() : null; };
const lum = h => [1, 3, 5].map(i => Number.parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const grounds = [hex('var(--surface)'), hex('var(--surface-sunken)')];
for (const r of rules) {
  if (!r.color && !r.bg) continue;
  const base = bySel[baseOf(r.sel)] || {};
  const fg = hex(r.color || base.color);
  if (!fg) continue; // inherits the text colour of the page
  const bgs = hex(r.bg || base.bg) ? [hex(r.bg || base.bg)] : grounds;
  const large = /--type-(title|numeral)/.test(r.font || base.font || '');
  for (const bg of bgs) {
    const x = ratio(fg, bg);
    if (x < (large ? 3 : 4.5)) fail('COL-03', `${r.sel}: ${fg} on ${bg} is ${x.toFixed(2)}:1`, 'rules.md');
  }
}

// NAM-01: for each component whose class takes a prop (`btn--${variant}`), every value of that prop
// has its CSS class, and the contract names the same values.
for (const f of fs.readdirSync(path.join(root, 'src/components')).filter(f => f.endsWith('.tsx'))) {
  const src = read('src/components/' + f);
  for (const m of src.matchAll(/([a-z]+(?:-[a-z]+)*)--\$\{(\w+)\}/g)) {
    const [, cls, prop] = m;
    const union = src.match(new RegExp(`\\b${prop}\\??: *('[a-z-]+'(?: *\\| *'[a-z-]+')*)`));
    if (!union) continue;
    const values = [...union[1].matchAll(/'([a-z-]+)'/g)].map(v => v[1]);
    const contractFile = (src.match(/contracts\/([a-z-]+\.md)/) || [])[1];
    const contract = contractFile ? read('contracts/' + contractFile) : '';
    const variants = (contract.split('## Variants and states')[1] || '').split('\n## ')[0];
    const reactLine = (contract.match(new RegExp(`//\\s*${prop}:\\s*([^\\n,]+)`)) || [])[1] || '';
    const listed = [...reactLine.matchAll(/[a-z-]+/g)].map(v => v[0]);
    for (const v of values) {
      if (!new RegExp(`\\.${cls}--${v}\\b`).test(css)) fail('NAM-01', `${f}: ${prop}="${v}" has no .${cls}--${v} in components.css`, 'rules.md');
      if (!new RegExp(`\\b${v}\\b`).test(variants)) fail('NAM-01', `${f}: ${prop}="${v}" is not named in the contract's variants`, `contracts/${contractFile}`);
    }
    if (listed.length && listed.join() !== values.join()) fail('NAM-01', `${f}: the contract lists ${prop} as ${listed.join(' | ')}, the props say ${values.join(' | ')}`, `contracts/${contractFile}`);
    if (!new RegExp(`${prop[0].toUpperCase() + prop.slice(1)}=`).test(variants)) fail('NAM-01', `${f}: the contract doesn't give the Figma property for ${prop}`, `contracts/${contractFile}`);
  }
}

if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
console.log('System checks passed: TOK-01, COL-03, NAM-01');
