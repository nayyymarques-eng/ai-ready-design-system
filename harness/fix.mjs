// Harness fix: corrects, on its own, only the errors that have one right answer. No AI, no tokens spent.
//   COL-01  a literal colour that is exactly the value of one token becomes that token: #3d3d3d → var(--text).
// Everything else is only named by the checks, and the builder fixes it: a colour that matches no token,
// or the value of two tokens (#111111 is --ink and --accent), needs a choice, so the harness never guesses.
// Usage: node harness/fix.mjs <screen files or folders>   (then run the checks again)
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.join(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const tokensCss = fs.readFileSync(path.join(root, 'tokens.css'), 'utf8');
// A path from the command line must stay inside this repository.
const inRepo = p => { const r = path.resolve(root, p); if (r !== root && !r.startsWith(root + path.sep)) { console.error(`${p} is outside this repository`); process.exit(1); } return r; };
const SYSTEM = new Set(['tokens.css', 'components.css'].map(f => path.join(root, f)));

// #abc and #aabbcc, lower case, six digits.
const norm = hex => {
  const h = hex.slice(1).toLowerCase();
  return h.length === 3 ? '#' + [...h].map(c => c + c).join('') : '#' + h;
};

// Colour value → the tokens that hold it.
const byValue = {};
for (const m of tokensCss.matchAll(/(--[a-z0-9-]+): *(#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?);/g)) (byValue[norm(m[2])] ||= []).push(m[1]);

const files = process.argv.slice(2).map(inRepo).flatMap(p => fs.statSync(p).isDirectory()
  ? fs.readdirSync(p).map(f => path.join(p, f))
  : [p]).filter(f => /\.(tsx|html|css)$/.test(f) && !SYSTEM.has(path.resolve(f)));
if (!files.length) { console.log('Usage: node harness/fix.mjs <screen files or folders>'); process.exit(1); }

let fixed = 0;
const left = [];
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  const after = before.replace(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g, (hex, at) => {
    const names = byValue[norm(hex)];
    const line = before.slice(0, at).split('\n').length;
    // An SVG or HTML colour attribute (fill="#…") can't read var(): moving it to CSS is the builder's call.
    if (names && /\b(fill|stroke|color|bgcolor)\s*=\s*\{?["']$/.test(before.slice(Math.max(0, at - 20), at))) {
      left.push(`COL-01  ${f}:${line}  ${hex} is in a colour attribute, which can't read a token: move it to CSS`);
      return hex;
    }
    if (names?.length === 1) { console.log(`fixed  COL-01  ${f}:${line}  ${hex} → var(${names[0]})`); fixed++; return `var(${names[0]})`; }
    if (names) left.push(`COL-01  ${f}:${line}  ${hex} is ${names.join(' and ')}: choose one`);
    return hex;
  });
  if (after !== before) fs.writeFileSync(f, after);
}
for (const l of left) console.log(`left   ${l}`);
console.log(`${fixed} fixed, ${left.length} left for the builder. Run the checks again.`);
