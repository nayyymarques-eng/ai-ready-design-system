// Sums eval/results.json by condition: checks passed, screens at 100, unlabelled and labelled parts.
// Usage: node eval/summary.mjs [results file, default eval/results.json]
//   (after: node harness/score.mjs eval/*/run-* --json eval/results.json)
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync(process.argv[2] || new URL('./results.json', import.meta.url)));
const by = {};
for (const r of rows) {
  const [, cond, run] = r.group.split('/');
  const c = (by[cond] ||= { runs: {}, passed: 0, applied: 0, at100: 0, screens: 0, unlabelled: 0, labelled: 0, fails: {} });
  c.passed += r.passed; c.applied += r.applied; c.screens++; if (r.score === 100) c.at100++;
  c.unlabelled += r.handBuilt; c.labelled += new Set(r.newParts.map(n => n.name)).size;
  (c.runs[run] ||= { passed: 0, applied: 0 }); c.runs[run].passed += r.passed; c.runs[run].applied += r.applied;
  for (const [id, v] of Object.entries(r.res)) if (!v.pass) c.fails[id] = (c.fails[id] || 0) + 1;
}
const pct = (a, b) => `${Math.round(100 * a / b)}%`;
console.log('| Condition | Checks passed | Per run | Screens at 100 | Unlabelled parts | Labelled new parts | Failed checks |');
console.log('|---|---|---|---|---|---|---|');
for (const [cond, c] of Object.entries(by)) {
  const runs = Object.values(c.runs).map(r => pct(r.passed, r.applied)).join(', ');
  const fails = Object.entries(c.fails).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ×${n}`).join(', ');
  console.log(`| ${cond} | ${c.passed} of ${c.applied} (${pct(c.passed, c.applied)}) | ${runs} | ${c.at100} of ${c.screens} | ${c.unlabelled} | ${c.labelled} | ${fails} |`);
}
