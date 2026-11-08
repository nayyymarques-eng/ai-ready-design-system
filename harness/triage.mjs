// Triage: collects the new parts the AI labelled in a folder of screens, one item per part.
// For each part: what it is (name, job, why, the component it refines, a picture and its code),
// and where it appears (screen and file). Repeats of the same part become occurrences of one item.
// Usage: node harness/triage.mjs <dir-with-rendered-screens> [--out triage-out]
// Writes <out>/items.json and <out>/<part>.png. It never fails the build: new parts are allowed,
// they go to triage, where the design system owner decides.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const args = process.argv.slice(2);
const outAt = args.indexOf('--out');
const out = outAt >= 0 ? args.splice(outAt, 2)[1] : 'triage-out';
const dir = args[0] || 'screens';
fs.mkdirSync(out, { recursive: true });

const items = new Map();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort()) {
  await page.goto(url.pathToFileURL(path.resolve(dir, f)).href);
  const parts = await page.evaluate(() => [...document.querySelectorAll('[data-new]')].map((el, i) => {
    el.setAttribute('data-triage-i', i);
    return { name: el.dataset.new, job: el.dataset.job || '', why: el.dataset.why || '', base: el.dataset.base || '', code: el.outerHTML.replace(/ data-triage-i="\d+"/, '').slice(0, 600) };
  }));
  for (const [i, p] of parts.entries()) {
    const screen = f.replace(/\.html$/, '');
    const tsx = path.join(dir, screen + '.tsx');
    const occ = { screen, file: fs.existsSync(tsx) ? tsx : path.join(dir, f) };
    if (!items.has(p.name)) {
      const shot = `${p.name}.png`;
      await page.locator(`[data-triage-i="${i}"]`).screenshot({ path: path.join(out, shot) });
      items.set(p.name, { ...p, picture: shot, occurrences: [] });
    }
    items.get(p.name).occurrences.push(occ);
  }
}
await browser.close();
const list = [...items.values()];
fs.writeFileSync(path.join(out, 'items.json'), JSON.stringify(list, null, 2));
console.log(`triage: ${list.length} new part${list.length === 1 ? '' : 's'} labelled${list.length ? ': ' + list.map(p => `${p.name} (${p.occurrences.length} screen${p.occurrences.length === 1 ? '' : 's'})`).join(', ') : ''}`);
