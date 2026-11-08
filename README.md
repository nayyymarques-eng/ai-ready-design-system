# AI-ready design system

A design system that AI coding tools can read, follow and be checked against, in React and TypeScript. It has seven parts: tokens, components, templates, contracts, rules, checks and triage.

Anyone who ships a screen goes through it: a PM building straight in code, a designer shipping a change, a developer. The design system gives an AI tool one agent workflow to follow, and the harness is the guardrail that decides when a screen is production-ready.

This is the kit behind the [Design system case](https://nayaramarques.com/design-system) on my portfolio: the system, the harness that runs the checks, and an eval that compares building with components only against building with the framework.

**Results in short** (the new feature, three runs per condition, first build): components only passed 85% of the checks, with 0 of 9 screens production-ready and 176 class names outside the system, none labelled. The framework passed 99%, with 8 of 9 screens production-ready, 1 class name outside the system and 16 new parts labelled for triage. Before it had templates, the framework passed 98%, with 6 of 9 production-ready, 8 unlabelled class names and 28 labelled parts. [The eval](#the-eval) has the details.

## The parts

| Part | Where | What it does |
|---|---|---|
| Tokens | `tokens.css` | The only place raw values live. Each name says what the value is for: `--critical`, not `--red`. |
| Components | `src/components/`, `components.css` | One React component per contract, with typed props, and their styles. A variant that doesn't exist, a `className` or a `style` doesn't compile. |
| Templates | `src/templates/` | Whole screens built from components: list page, detail page and form page. A screen starts from the one that fits its job. Each has a contract like a component. |
| Contracts | `contracts/` | One file per component and per template: what it is, markup, variants, use for, never, where it lives, and the checks that enforce it. |
| Rules | `rules.md` | How components sit together on a screen, which template to start from (TPL), and the one way in for a new part (CMP-03). |
| Decision map | `decision-map.md` | The contracts' "use for" and "never" lines, sorted by job. `build-map.py` writes it from the contracts; nobody edits it by hand. |
| Checks | `harness/score.mjs` | The guardrails. Opens each screen in a headless browser at 1280px and 375px and runs 19 checks: 10 from the screen rules (one is TSC-01, the screen compiles) and 9 from contracts. |
| Triage | `test/triage-log.md` | Every new part the first run labelled: what reaches triage. |

An AI tool starts at `AGENTS.md`, which says what to read, in order.

## Use it

Once: `npm install` and `npx playwright install chromium`.

1. Point your AI coding tool at this folder and ask for a screen. It reads `AGENTS.md` first. A screen is one `.tsx` file in `screens/` that default-exports the screen and imports components from `../src`.
2. Check it: `npm run preview -- screens/<name>.tsx` says whether it compiles and renders it to HTML. Then `npm run typecheck:screens -- screens` and `node harness/score.mjs screens`. Each failed check names the rule, what broke and where the rule lives:

   ```
   MENU-01 (3 cells with 3+ buttons)  ← contracts/menu-button.md
   ```

3. When a contract changes, run `python3 build-map.py` to rebuild the decision map.

A failed check is an error: a value that isn't a token, a restyled component, or a part built outside the system with no label. The harness doesn't change the screen; the builder fixes it in the same pull request and the harness runs again. The screen is production-ready only when every check passes, so errors never reach triage. Run on every change, the same checks are the regression safeguards: an error that was fixed can't come back unnoticed.

Only new parts reach triage. A new part is never blocked: the build labels it with `data-new`, `data-job` and `data-why`, and adds `data-base` when it refines an existing component. Once every check passes, the screen ships and the part goes to triage. Triage takes the first decision that fits:

| Decision | When | What changes |
|---|---|---|
| Replaced by one that exists | A component already does the job, as it is | The screen switches to that component. The contracts get a line for this job, so the next build uses it. |
| Updates the component | It refines a component, and the change is worth keeping | The change goes into that component's contract, Figma and code. Every screen with the part switches back to the component. |
| Becomes a component | The same part reached triage more than once | It gets a contract and goes into Figma and code, with the same name. Every screen with the part switches to it. |
| Waits until it appears again | It reached triage once | The screen keeps the labelled part. If it reaches triage again, it becomes a component. |

## The eval

Three conditions on the same tokens and React components, for a delivery operations product called Tolvane:

- **Components only**: `tokens.css`, `components.css`, the components in `src/` and a catalogue of them (`eval/catalogue.md`). No rules, no contracts, no templates, no `NewPart`.
- **Framework, before templates** (`eval/framework-v1/`): the same tokens and components, plus `AGENTS.md`, the rules, the decision map and the contracts.
- **Framework** (`eval/framework/`): all of that, plus the three templates and the rules for them.

Each condition built a new feature, proof of delivery, three times. The feature has three screens (`eval/briefs.md`) and needs parts the system doesn't have, such as a photo, a signature and a file upload. That is where a design system is tested: on the screens it covers, both conditions do well (see the first run below). One AI agent built each screen from a fresh start and never saw the harness, the other conditions or the other runs; `eval/prompt.md` has the prompt. The scores are the first build, before any fix.

| Condition | Checks passed | Per run | Production-ready screens | Unlabelled parts outside the system | Labelled new parts |
|---|---|---|---|---|---|
| Components only | 123 of 144 (85%) | 83%, 90%, 83% | 0 of 9 | 176 | 0 |
| Framework, before templates | 144 of 147 (98%) | 98%, 100%, 96% | 6 of 9 | 8 | 28 |
| Framework | 146 of 147 (99%) | 100%, 100%, 98% | 8 of 9 | 1 | 16 |

Every screen in all conditions compiled. The types stop a restyle through props, but not a `<style>` block aimed at a component's class: components only did that on 8 of 9 screens (CMP-04), and the harness caught each one. Before templates, the framework's three errors were two parts built outside `NewPart` (CMP-01) and one `data-base` that named a layout class instead of a component (CMP-03). With templates, one class name was left outside `NewPart` (CMP-01). The harness names the rule and the file for each, so the builder fixes them in the same pull request; nothing unlabelled ships.

With templates, the builders started 8 of 9 screens from one: every queue from the list page, every proof from the detail page, and two of three rules screens from the form page. The labelled new parts fell from 28 to 16, mostly because layout workarounds went away: the scrolling filter row, person cells, badge groups, checkbox groups and most two-line table cells. What was left is mostly what the system really lacks: the photo, the signature, a thumbnail, a file upload and a multi-line message. The third rules screen used no template and said why at the top, as TPL-02 asks: it lists senders and edits one sender's rules on the same screen, which no template does. That screen goes to triage as a candidate template.

Unlabelled parts are class names outside the system that no labelled part holds, counted per screen. Labelled new parts are the distinct `data-new` names, counted per screen.

Run it again:

```
npm run eval:setup                      # writes eval/components-only/ and eval/framework/ from the system (eval/framework-v1/ stays as it was)
# build eval/<condition>/run-<n>/<screen>.tsx with the prompt in eval/prompt.md
npm run typecheck:screens -- eval/*/run-*
npm run render -- eval/*/run-*
node harness/score.mjs eval/*/run-* --json eval/results.json
node eval/summary.mjs
```

## The first run

Before the kit moved to React, the same comparison ran once, in HTML, on nine screens: six the system covers and the same new feature. On the six covered screens the two conditions were close (99% and 100%). On the new feature, components only passed 84% and the framework 100%. The screens, the briefs and the results are in `test/`; `npm run score` scores them again.

## Files

```
AGENTS.md            the agent workflow: what to read, in order
tokens.css           tokens
components.css       component styles
src/components/      one React component per contract; src/index.ts exports them
src/templates/       list page, detail page and form page
contracts/           one contract per component
rules.md             screen rules
decision-map.md      built from the contracts
build-map.py         builds the decision map
harness/score.mjs    the checks
scripts/             preview, typecheck, render, make-eval
eval/
  briefs.md          the three feature briefs
  prompt.md          the prompt each builder got
  catalogue.md       what components only got besides the components
  components-only/   the system that condition got, and run-1 to run-3
  framework-v1/      the framework before templates, and its run-1 to run-3
  framework/         the framework with templates, and run-1 to run-3
  results.json       every check on every screen
  summary.mjs        sums the results by condition
test/                the first run, in HTML
```

## What it doesn't cover

- Depth. The eval is small: it shows how the framework works.
- Fidelity to a design file. The harness checks that a screen follows the system, not that it matches a Figma frame; when a designer changes a frame, the Figma MCP server carries it to code.
- A large team. The builds were AI tools working alone, and I did the triage.
- Many people using the same design system. How triage works when many people add new parts at the same time is untested.

By [Nayara Marques](https://nayaramarques.com).
