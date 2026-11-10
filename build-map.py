#!/usr/bin/env python3
"""Builds decision-map.md from the contracts. Nobody edits the map by hand: change a contract, run this."""
import pathlib, re
root = pathlib.Path(__file__).parent
rows = []
for p in sorted((root / 'contracts').glob('*.md')):
    t = p.read_text()
    name = t.splitlines()[0][2:]
    sec = lambda h: re.findall(r'^- (.+)$', t.split(f'## {h}\n', 1)[1].split('\n## ', 1)[0], re.M)
    # Each "never" line ends with "(checked by ID)" or "(no check yet)": the map shows the check for each line
    nevers, checks = [], []
    for line in sec('Never'):
        m = re.match(r'(.+?)\s*\((?:(.+); )?(checked by ([A-Z0-9-]+)|no check yet)\)$', line)
        assert m, f'{p.name}: "{line}" must end with (checked by ID) or (no check yet)'
        nevers.append(f'{m[1]} ({m[2]})' if m[2] else m[1])
        checks.append(m[4] or 'No check yet')
    for job in sec('Use for'):
        rows.append((job, f'[{name}](contracts/{p.name})', '; '.join(nevers), '; '.join(checks)))
rows.sort(key=lambda r: r[0].lower())
out = ['# Decision map', '', 'Built from the contracts by `build-map.py`. Find the job, use the component, avoid what it says not to do.', '',
       '| The job | Use | Never | Checked by, in the same order |', '|---|---|---|---|']
out += [f'| {a} | {b} | {c} | {d} |' for a, b, c, d in rows]
(root / 'decision-map.md').write_text('\n'.join(out) + '\n')
print(f'{len(rows)} rows')
