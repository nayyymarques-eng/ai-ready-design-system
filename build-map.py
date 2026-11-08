#!/usr/bin/env python3
"""Builds decision-map.md from the contracts. Nobody edits the map by hand: change a contract, run this."""
import pathlib, re
root = pathlib.Path(__file__).parent
rows = []
for p in sorted((root / 'contracts').glob('*.md')):
    t = p.read_text()
    name = t.splitlines()[0][2:]
    sec = lambda h: re.findall(r'^- (.+)$', t.split(f'## {h}\n', 1)[1].split('\n## ', 1)[0], re.M)
    checks = t.split('## Checked by\n', 1)[1].strip()
    for job in sec('Use for'):
        rows.append((job, f'[{name}](contracts/{p.name})', '; '.join(sec('Never')), checks))
rows.sort(key=lambda r: r[0].lower())
out = ['# Decision map', '', 'Built from the contracts by `build-map.py`. Find the job, use the component, avoid what it says not to do.', '',
       '| The job | Use | Never | Checked by |', '|---|---|---|---|']
out += [f'| {a} | {b} | {c} | {d} |' for a, b, c, d in rows]
(root / 'decision-map.md').write_text('\n'.join(out) + '\n')
print(f'{len(rows)} rows')
