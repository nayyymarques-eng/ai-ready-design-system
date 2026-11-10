// Harness score: how closely an AI-built screen obeys the design system.
// Opens each screen in headless Chromium (1280px, then 375px), checks the scored rules in rules.md,
// and gives each screen a score: rules passed / rules that apply, as a percentage.
// Usage: node harness/score.mjs <dir-with-screens> [more dirs] [--json out.json]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const css = fs.readFileSync(path.join(here, '../components.css'), 'utf8');
const CATALOGUE = [...new Set([...css.matchAll(/\.([a-z][a-z0-9_-]*)/g)].map(m => m[1]))]
  .filter(c => !/^(\d|is$)/.test(c));
// Every custom property tokens.css defines, plus --value (the one a screen may set, on progress and bar chart).
const TOKENS = [...new Set([...fs.readFileSync(path.join(here, '../tokens.css'), 'utf8').matchAll(/(--[a-z0-9-]+):/g)].map(m => m[1]))].concat('--value');

const args = process.argv.slice(2);
const jsonAt = args.indexOf('--json');
const jsonOut = jsonAt >= 0 ? args.splice(jsonAt, 2)[1] : null;
const dirs = args;

function inPage([CATALOGUE, COMPONENTS, TOKENS]) {
  const cat = new Set(CATALOGUE);
  const components = new Set(COMPONENTS);
  const res = {};
  const set = (id, applies, pass, detail) => { if (applies) res[id] = { pass, detail: pass ? '' : detail }; };
  const all = [...document.querySelectorAll('body *')];
  const newRoots = [...document.querySelectorAll('[data-new]')];
  const labelled = r => (r.dataset.job || '').trim() && (r.dataset.why || '').trim();
  const inNew = el => { const r = el.closest('[data-new]'); return r && labelled(r); };

  // CMP-01 catalogue only (a labelled new part may use its own x- classes)
  const unknown = [];
  for (const el of all) for (const c of el.classList) if (!cat.has(c) && !(c.startsWith('x-') && inNew(el))) unknown.push(c);
  set('CMP-01', true, unknown.length === 0, [...new Set(unknown)].join(' '));

  // CMP-03 new parts are labelled with their job and why
  // and a refinement names the component it starts from (data-base)
  const unlabelled = newRoots.filter(r => !labelled(r)).map(r => r.dataset.new);
  const badBase = newRoots.filter(r => r.dataset.base !== undefined && !components.has(r.dataset.base)).map(r => `${r.dataset.new} (data-base="${r.dataset.base}" is not a component)`);
  const noBase = newRoots.filter(r => r.dataset.base === undefined && [r, ...r.querySelectorAll('*')].some(el => el.closest('[data-new]') === r && [...el.classList].some(c => c.startsWith('x-')) && [...el.classList].some(c => cat.has(c)))).map(r => `${r.dataset.new} (refines a component with no data-base)`);
  const cmp03 = [...unlabelled, ...badBase, ...noBase];
  set('CMP-03', newRoots.length > 0, cmp03.length === 0, cmp03.join(' '));

  // CMP-04 no restyling of catalogue components
  const styles = [...document.querySelectorAll('style')].map(s => s.textContent).join('\n');
  const onlyValue = el => /^--value: *[\d.]+;?$/.test((el.getAttribute('style') || '').trim());
  const restyled = all.filter(el => el.hasAttribute('style') && !inNew(el) && !onlyValue(el)).map(el => el.tagName.toLowerCase() + '.' + [...el.classList].join('.'));
  const selectors = styles.replace(/\{[^}]*\}/g, '\n').split(/[\n,]/).map(s => s.trim()).filter(Boolean);
  for (const s of selectors.filter(s => !/\.x-/.test(s))) for (const m of s.matchAll(/\.([a-z][a-z0-9_-]*)/g)) if (cat.has(m[1])) restyled.push('<style> ' + s);
  set('CMP-04', true, restyled.length === 0, [...new Set(restyled)].slice(0, 6).join(' | '));

  // Raw CSS on the screen: inline styles and <style> blocks
  const inline = all.filter(el => !onlyValue(el)).map(el => el.getAttribute('style') || '').join(';');
  const raw = inline + '\n' + styles.replace(/:root\s*\{[^}]*\}/g, '');

  // TTL-01 one h1, and it is the page header title
  const h1 = document.querySelectorAll('h1');
  set('TTL-01', true, h1.length === 1 && h1[0].classList.contains('page-header__title'), `${h1.length} h1`);

  // TTL-02 headings in order
  let prev = 0, skip = '';
  for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) { const l = +h.tagName[1]; if (l > prev + 1) skip = `h${prev || '-'} → h${l}`; prev = l; if (skip) break; }
  set('TTL-02', true, !skip, skip);

  // TYP-01 no pixel font sizes
  const fontPx = raw.match(/font(-size)?\s*:[^;}]*\d+(\.\d+)?px/g) || [];
  set('TYP-01', true, fontPx.length === 0, fontPx.slice(0, 3).join(' | '));

  // SPC-01 spacing on the scale
  const scale = new Set(['0', '1', '2', '4', '8', '12', '16', '24', '32', '48', '64']); // 1–2 for hairlines
  const off = [];
  for (const m of raw.matchAll(/(margin|padding|gap|row-gap|column-gap)(-[a-z]+)?\s*:\s*([^;}]+)/g))
    for (const v of m[3].matchAll(/(-?\d+(\.\d+)?)px/g)) if (!scale.has(String(Math.abs(+v[1])))) off.push(`${m[1]}${m[2] || ''}: ${v[0]}`);
  set('SPC-01', true, off.length === 0, off.slice(0, 4).join(' | '));

  // COL-01 no literal colours
  const named = '(?:red|blue|green|gray|grey|black|white|orange|yellow|purple|pink|teal|navy|silver|gold|maroon|olive|lime|aqua|fuchsia|crimson|tomato|coral|salmon|indigo|violet|brown|beige|ivory|khaki)';
  const colRe = new RegExp(`#[0-9a-fA-F]{3,8}\\b|rgba?\\(|hsla?\\(|oklch\\(|:\\s*${named}\\b`, 'g');
  const attrs = all.flatMap(el => ['fill', 'stroke', 'color', 'bgcolor'].map(a => el.getAttribute(a) || '')).join(' ');
  const cols = (raw.match(colRe) || []).concat(attrs.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g) || []);
  set('COL-01', true, cols.length === 0, [...new Set(cols)].slice(0, 4).join(' '));


  // TOK-01 every var(--name) on the screen is a token that exists
  const tokens = new Set(TOKENS);
  const missing = [...new Set([...raw.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)].map(m => m[1]).filter(n => !tokens.has(n)))];
  set('TOK-01', true, missing.length === 0, missing.slice(0, 4).join(' '));

  // COL-03 text reaches 4.5:1 on what is behind it (3:1 at 24px, or 18.66px bold); disabled controls don't count
  const rgba = c => { const m = c.match(/[\d.]+/g) || [0, 0, 0, 0]; return [+m[0], +m[1], +m[2], m[3] === undefined ? 1 : +m[3]]; };
  const over = (top, under) => top.slice(0, 3).map((v, i) => v * top[3] + under[i] * (1 - top[3])).concat(1);
  const ground = el => { // the colour behind an element: its backgrounds, top to bottom, laid over white
    const layers = [];
    for (let e = el; e; e = e.parentElement) { const b = rgba(getComputedStyle(e).backgroundColor); if (b[3] > 0) { layers.push(b); if (b[3] === 1) break; } }
    return layers.reverse().reduce((acc, b) => over(b, acc), [255, 255, 255, 1]);
  };
  const lum = c => { const [r, g, b] = c.slice(0, 3).map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const low = [];
  for (const el of all) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    if (el.closest('svg, [disabled], [aria-disabled="true"], [hidden], [aria-hidden="true"]')) continue;
    const st = getComputedStyle(el);
    if (st.visibility === 'hidden' || st.display === 'none' || !el.getClientRects().length) continue;
    const bg = ground(el), fg = over(rgba(st.color), bg);
    const size = Number.parseFloat(st.fontSize), large = size >= 24 || (size >= 18.66 && +st.fontWeight >= 700);
    const r = ratio(fg, bg);
    if (r < (large ? 3 : 4.5)) low.push(`"${el.textContent.trim().slice(0, 20)}" ${r.toFixed(2)}:1`);
  }
  set('COL-03', true, low.length === 0, [...new Set(low)].slice(0, 3).join(' | '));

  // BADGE-01 status colour only through badge or banner (no coloured text)
  const tone = ['--positive', '--warning', '--critical', '--info'].map(t => getComputedStyle(document.documentElement).getPropertyValue(t).trim());
  const toRgb = h => { const n = Number.parseInt(h.slice(1), 16); return `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})`; };
  const tones = new Set(tone.map(toRgb));
  const tinted = all.filter(el => el.closest('body') && !el.closest('.badge, .banner, .field__error, .btn, svg, [data-new]') && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && tones.has(getComputedStyle(el).color));
  set('BADGE-01', true, tinted.length === 0, tinted.slice(0, 3).map(el => `"${el.textContent.trim().slice(0, 24)}"`).join(' '));

  // CARD-01 no card inside a card
  const nested = [...document.querySelectorAll('.card .card')];
  set('CARD-01', document.querySelector('.card') !== null, nested.length === 0, `${nested.length} nested cards`);

  // TABLE-01 amounts in tables are right-aligned (is-number)
  const money = [...document.querySelectorAll('td')].filter(td => /^[-−]?\s*[$€£R]\$?\s?[\d.,]+$/.test(td.textContent.trim()) && getComputedStyle(td).textAlign !== 'right');
  set('TABLE-01', document.querySelector('td') !== null, money.length === 0, `${money.length} amounts not right-aligned`);

  // FIELD-01 every input has a label
  const inputs = [...document.querySelectorAll('input, select, textarea')].filter(i => !['hidden', 'submit', 'button'].includes(i.type));
  const noLabel = inputs.filter(i => !(i.closest('label') || (i.id && document.querySelector(`label[for="${CSS.escape(i.id)}"]`)) || i.getAttribute('aria-label') || i.getAttribute('aria-labelledby')));
  set('FIELD-01', inputs.length > 0, noLabel.length === 0, `${noLabel.length} of ${inputs.length} inputs`);

  // BTN-02 every button has a name
  const buttons = [...document.querySelectorAll('button')];
  const noName = buttons.filter(b => !b.textContent.trim().replace(/[⋯…•·]/g, '') && !b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby'));
  set('BTN-02', buttons.length > 0, noName.length === 0, `${noName.length} of ${buttons.length} buttons`);

  // MENU-01 several row actions go in a menu button
  const cells = [...document.querySelectorAll('td')];
  const crowded = cells.filter(td => td.querySelectorAll('button, a.btn').length > 2 && !td.querySelector('.menu-button'));
  set('MENU-01', cells.length > 0, crowded.length === 0, `${crowded.length} cells with 3+ buttons`);

  // BTN-01 one primary action per header, card or dialog
  const scopes = [...document.querySelectorAll('.page-header, .card, .dialog, .empty-state')];
  const twoPrimary = scopes.filter(s => [...s.querySelectorAll('.btn--primary')].filter(b => b.closest('.page-header, .card, .dialog, .empty-state') === s).length > 1);
  set('BTN-01', document.querySelector('.btn--primary') !== null, twoPrimary.length === 0, `${twoPrimary.length} containers with 2+ primary`);

  // TABS-01 one tab row per screen
  const tabs = document.querySelectorAll('.tabs, [role="tablist"]');
  set('TABS-01', tabs.length > 0, tabs.length <= 1, `${tabs.length} tab rows`);

  // NUM-01 counts are numerals, not badges
  const countBadges = [...document.querySelectorAll('.badge')].filter(b => b.closest('.nav-rail, h1, h2, h3, .tabs__item, .section__title') && /^\d+$/.test(b.textContent.trim()));
  set('NUM-01', document.querySelector('.nav-rail, .badge') !== null, countBadges.length === 0, `${countBadges.length} count badges`);

  // Inventory
  const catEls = all.filter(el => [...el.classList].some(c => cat.has(c))).length;
  const handBuilt = new Set(unknown).size;
  const newParts = newRoots.map(r => ({ name: r.dataset.new, job: r.dataset.job || '', why: r.dataset.why || '', base: r.dataset.base || '' }));
  return { res, catEls, handBuilt, newParts };
}

// Where each check comes from: the contract that lists it, or the screen rules.
const SOURCE = {};
const cdir = path.join(here, '../contracts');
if (fs.existsSync(cdir)) for (const f of fs.readdirSync(cdir)) {
  const t = fs.readFileSync(path.join(cdir, f), 'utf8');
  for (const id of (t.split('## Checked by\n')[1] || '').match(/[A-Z]+-\d+/g) || []) (SOURCE[id] ||= []).push('contracts/' + f);
}
const COMPONENTS = fs.existsSync(cdir) ? fs.readdirSync(cdir).map(f => f.replace(/\.md$/, '')) : [];
const from = id => (SOURCE[id] && !/^(TTL|LAY|SPC|CMP|TYP|COL|TSC|TOK|NAM)-/.test(id) ? SOURCE[id].join(', ') : 'rules.md');
const browser = await chromium.launch();
const report = [];
for (const dir of dirs) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort();
  for (const f of files) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const file = url.pathToFileURL(path.resolve(dir, f)).href;
    await page.goto(file);
    const r = await page.evaluate(inPage, [CATALOGUE, COMPONENTS, TOKENS]);
    // TSC-01 the screen compiles (scripts/typecheck.mjs writes typecheck.json next to the screens)
    const tscFile = path.join(dir, 'typecheck.json');
    if (fs.existsSync(tscFile)) {
      const tsc = JSON.parse(fs.readFileSync(tscFile, 'utf8'))[f.replace(/\.html$/, '.tsx')];
      if (tsc) r.res['TSC-01'] = { pass: tsc.errors.length === 0, detail: tsc.errors.slice(0, 2).join(' | ') };
    }
    await page.setViewportSize({ width: 375, height: 800 });
    await page.waitForTimeout(50);
    const wide = await page.evaluate(() => document.scrollingElement.scrollWidth);
    r.res['LAY-01'] = { pass: wide <= 375, detail: wide <= 375 ? '' : `${wide}px wide at 375` };
    await page.close();
    const ids = Object.keys(r.res);
    const passed = ids.filter(i => r.res[i].pass).length;
    report.push({ group: path.relative(path.join(here, '..'), path.resolve(dir)), screen: f, score: Math.round(1000 * passed / ids.length) / 10, passed, applied: ids.length, ...r });
  }
}
await browser.close();

for (const g of [...new Set(report.map(r => r.group))]) {
  const rows = report.filter(r => r.group === g);
  console.log(`\n${g}`);
  for (const r of rows) {
    const fails = Object.entries(r.res).filter(([, v]) => !v.pass).map(([k, v]) => `${k} (${v.detail})  ← ${from(k)}`);
    console.log(`  ${r.screen.padEnd(28)} ${String(r.score).padStart(5)}  ${r.passed}/${r.applied}  unlabelled parts ${r.handBuilt}  labelled new parts ${new Set(r.newParts.map(n => n.name)).size}${fails.length ? '\n      ' + fails.join('\n      ') : ''}`);
  }
  const avg = rows.reduce((a, r) => a + r.score, 0) / rows.length;
  const p = rows.reduce((a, r) => a + r.passed, 0), n = rows.reduce((a, r) => a + r.applied, 0);
  console.log(`  average score ${avg.toFixed(1)}   checks passed ${p}/${n}   screens at 100: ${rows.filter(r => r.score === 100).length}/${rows.length}`);
}
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2));
