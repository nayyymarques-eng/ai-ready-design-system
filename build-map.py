#!/usr/bin/env python3
"""Builds decision-map.md (for the AI) and check-coverage.md (for people) from the contracts.
Nobody edits either by hand: change a contract, run this."""
import pathlib, re
root = pathlib.Path(__file__).parent
rows, cover = [], []
for p in sorted((root / 'contracts').glob('*.md')):
    t = p.read_text()
    name = t.splitlines()[0][2:]
    link = f'[{name}](contracts/{p.name})'
    sec = lambda h: re.findall(r'^- (.+)$', t.split(f'## {h}\n', 1)[1].split('\n## ', 1)[0], re.M)
    # Each "never" line ends with "(checked by ID)" or "(no check yet)", and may name the component
    # to use instead: "(use a numeral; checked by NUM-01)".
    instead = []
    for line in sec('Never'):
        text, _, note = line.rpartition('(')
        note = note.rstrip(')')
        hint, _, tag = note.rpartition('; ')
        if tag != 'no check yet' and not tag.startswith('checked by '):
            raise SystemExit(f'{p.name}: "{line}" must end with (checked by ID) or (no check yet)')
        if hint.startswith('use '):
            instead.append(f'{text.strip()}: {hint}')
        cover.append((link, f'{text.strip()} ({hint})' if hint else text.strip(),
                      tag.removeprefix('checked by ') if tag != 'no check yet' else 'No check yet'))
    for job in sec('Use for'):
        rows.append((job, link, '; '.join(instead) or '-'))
rows.sort(key=lambda r: r[0].lower())
out = ['# Decision map', '',
       'Built from the contracts by `build-map.py`. Find the job, use the component. "Instead" names the component for a',
       'nearby job this one must not do. Everything a component must never do is in its contract.', '',
       '| The job | Use | Instead |', '|---|---|---|']
out += [f'| {a} | {b} | {c} |' for a, b, c in rows]
(root / 'decision-map.md').write_text('\n'.join(out) + '\n')
checked = sum(1 for c in cover if c[2] != 'No check yet')
out = ['# Check coverage', '',
       'Built from the contracts by `build-map.py`, for the people who keep the system. The AI does not read it.',
       f'Each "never" line of every contract, and the check that catches it: {checked} of {len(cover)} have one.', '',
       '| Contract | Never | Checked by |', '|---|---|---|']
out += [f'| {a} | {b} | {c} |' for a, b, c in cover]
(root / 'check-coverage.md').write_text('\n'.join(out) + '\n')
print(f'{len(rows)} rows in the map, {len(cover)} never lines ({checked} checked)')
