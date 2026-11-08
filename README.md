# AI-ready design system

A design system that AI coding tools can read, follow and be checked against. It has six parts: tokens, components, contracts, rules, checks and triage.

This is the kit behind the [Design system case](https://nayaramarques.com/design-system) on my portfolio: the system, the harness that runs the checks, and a test that compares building with components only against building with the framework.

## The parts

| Part | Where | What it does |
|---|---|---|
| Tokens | `tokens.css` | The only place raw values live. Each name says what the value is for: `--critical`, not `--red`. |
| Components | `components.css` | The styles of every component. |
| Contracts | `contracts/` | One file per component: what it is, markup, variants, use for, never, where it lives, and the checks that enforce it. |
| Rules | `rules.md` | How components sit together on a screen, and the one way in for a new part (CMP-03). |
| Decision map | `decision-map.md` | The contracts' "use for" and "never" lines, sorted by job. `build-map.py` writes it from the contracts; nobody edits it by hand. |
| Checks | `harness/score.mjs` | Opens each screen in a headless browser at 1280px and 375px and runs 18 checks: 9 from the screen rules and 9 from contracts. |
| Triage | `test/triage-log.md` | What happened to each new part a build labelled. |

An AI tool starts at `AGENTS.md`, which says what to read, in order.

## Use it

1. Point your AI coding tool at this folder and ask for a screen. It reads `AGENTS.md` first. Screens link `tokens.css`, then `components.css`.
2. Score the screens: `npm install` and `npx playwright install chromium` once, then `node harness/score.mjs <folder>`. Each failed check names the rule, what broke and where the rule lives:

   ```
   MENU-01 (3 cells with 3+ buttons)  ← contracts/menu-button.md
   ```

3. When a contract changes, run `python3 build-map.py` to rebuild the decision map.

A failed check is an error: a value that isn't a token, a restyled component, or a part built outside the system with no label. The harness doesn't change the screen; the builder fixes it in the same pull request and the harness runs again. The screen ships only when every check passes, so errors never reach triage.

Only new parts reach triage. A new part is never blocked: the build labels it with `data-new`, `data-job` and `data-why`, and adds `data-base` when it refines an existing component. Once every check passes, the screen ships and the part goes to triage. Triage takes the first decision that fits:

| Decision | When | What changes |
|---|---|---|
| Replaced by one that exists | A component already does the job, as it is | The screen switches to that component. The contracts get a line for this job, so the next build uses it. |
| Updates the component | It refines a component, and the change is worth keeping | The change goes into that component's contract, Figma and code. Every screen with the part switches back to the component. |
| Becomes a component | The same part reached triage more than once | It gets a contract and goes into Figma and code, with the same name. Every screen with the part switches to it. |
| Waits until it appears again | It reached triage once | The screen keeps the labelled part. If it reaches triage again, it becomes a component. |

## The test

Two runs on the same tokens and components, for a delivery operations product called Tolvane:

- **Components only**: `tokens.css`, `components.css` and `test/catalogue.md`, the list of components. No rules.
- **Framework**: the same tokens and components, plus `AGENTS.md`, the rules, the decision map and the contracts.

Each run built nine screens from `test/briefs.md`: six the system covers, and a new feature, proof of delivery, in three screens. The feature needs parts the system doesn't have, such as a photo, a signature and a date picker. One AI agent built each screen from a fresh start and never saw the harness; `test/prompt.md` has the prompt. Each run ran once. The screens were built before refinements and `data-base` were added to the rules; that earlier version of `rules.md` is in the history.

| Run | Screens | Checks passed | Screens at 100 | Unlabelled parts outside the system | Labelled new parts |
|---|---|---|---|---|---|
| Components only | Six the system covers | 85 of 86 (99%) | 5 of 6 | 0 | 0 |
| Components only | New feature | 36 of 43 (84%) | 0 of 3 | 73 | 0 |
| Framework | Six the system covers | 87 of 87 (100%) | 6 of 6 | 0 | 1 |
| Framework | New feature | 46 of 46 (100%) | 3 of 3 | 0 | 7 |

Unlabelled parts are class names outside the system that no labelled part holds, counted per screen. Labelled new parts are the distinct `data-new` names on the screens as they load.

On the screens the system covers, the two runs were close. On the new feature, components only built what the system lacks from 73 class names outside it, and labelled none of them. The framework passed every check and labelled each new part for triage. `test/triage-log.md` has every labelled part and the decision it got.

Run the checks again: `npm install` and `npx playwright install chromium` once, then `npm run score`.

## Files

```
AGENTS.md            what to read, in order
tokens.css           tokens
components.css       components
contracts/           one contract per component
rules.md             screen rules
decision-map.md      built from the contracts
build-map.py         builds the decision map
harness/score.mjs    the checks
test/
  briefs.md          the nine briefs
  prompt.md          the prompt each builder got
  catalogue.md       what the components-only run got besides the stylesheets
  components-only/   nine screens, components only
  framework/         nine screens, the framework
  triage-log.md      the new parts and what happened to each
  results.json       every check on every screen
```

## What it doesn't cover

- A large team. The builds were AI tools working alone, and I did the triage.
- Many people using the same design system. How triage works when many people add new parts at the same time is untested.

By [Nayara Marques](https://nayaramarques.com).
