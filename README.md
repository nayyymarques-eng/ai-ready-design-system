# AI-ready design system

A framework that makes any design system readable by AI coding tools, and checks every screen against it, in React and TypeScript. The framework is the structure: contracts, rules, a decision map, the harness and triage. The tokens, components and rules in this repo are an example system, the one used in the eval. A team brings its own.

Anyone who ships a screen goes through it: a PM building straight in code, a designer shipping a change, a developer. The framework gives an AI tool one agent workflow to follow, and the harness is the guardrail that decides when a screen is production-ready.

This is the kit behind the [Design system case](https://nayaramarques.com/design-system) on my portfolio: the system, the harness that runs the checks, and an eval that compares building with components only against building with the framework.

**Results in short** (the new feature, three runs per condition, first build): components only passed 85% of the checks, with 0 of 9 screens production-ready and 176 class names outside the system, none labelled. The framework passed 99%, with 8 of 9 screens production-ready, 1 class name outside the system and 16 new parts labelled for triage. [The eval](#the-eval) has the details.

## The parts

| Part | Where | What it does |
|---|---|---|
| Tokens | `tokens.css` | The only place raw values live. Each name says what the value is for: `--critical`, not `--red`. |
| Components | `src/components/`, `components.css` | One React component per contract, with typed props, and their styles. A variant that doesn't exist, a `className` or a `style` doesn't compile. |
| Templates | `src/templates/` | Whole screens built from components: list page, detail page and form page. A screen starts from the one that fits its job. Each has a contract like a component. |
| Contracts | `contracts/` | One file per component and per template: what it is, markup, variants, use for, never, where it lives, and the checks that enforce it. |
| Rules | `rules.md` | How components sit together on a screen, which template to start from (TPL), and the one way in for a new part (CMP-03). |
| Decision map | `decision-map.md` | The contracts' "use for" lines, sorted by job, and the component to use instead for a nearby job. `build-map.py` writes it from the contracts; nobody edits it by hand. |
| Check coverage | `check-coverage.md` | Every "never" line of every contract, and the check that catches it, for the people who keep the system. `build-map.py` writes it too. The AI doesn't read it. |
| Checks | `harness/score.mjs`, `harness/system.mjs` | The guardrails. `score.mjs` opens each screen in a headless browser at 1280px and 375px and runs 21 checks: 12 from the screen rules (one is TSC-01, the screen compiles) and 9 from contracts. `system.mjs` checks the system itself: every token it uses exists, every text colour is readable on its background, and every variant has one name. |
| Triage | [GitHub Issues, label `triage`](https://github.com/nayyymarques-eng/ai-ready-design-system/issues?q=label%3Atriage) | Every new part the AI labelled on a pull request, one issue each: what reaches triage. |

An AI tool starts at `AGENTS.md`, which says what to read, in order.

## What the AI reads

The AI reads only what the screen needs: `AGENTS.md`, the rules, the decision map and the contract of each component the screen uses. The files are small, so a screen costs few tokens.

| File | Size | Tokens, about |
|---|---|---|
| `AGENTS.md` | 1.5 KB | 370 |
| `rules.md` | 5.0 KB | 1,250 |
| `decision-map.md` | 3.4 KB | 840 |
| `contracts/`, 26 files | 22.9 KB, 0.47 to 1.6 KB each | 5,710 |
| All of it | 32.7 KB | 8,180 |
| One screen of the eval's new feature, with 6 to 12 contracts | 15 to 19 KB | 3,800 to 4,900 |

Tokens are counted as one for every four characters, so they are close, not exact. The page loads `tokens.css` and `components.css` itself, and this README is not on the AI's path. The decision map is the one file that grows with the system, by about 100 bytes per component.

## What you can change

The names are each organisation's choice: "critical" or "error", one layer of tokens or several. The framework doesn't pick the names. It makes sure the AI uses the ones the system has. A team brings its own tokens, components, contracts and rules. What stays the same is how they work together.

| Part | What a team sets | What stays the same |
|---|---|---|
| Tokens and variants | The names and the values | Every name a screen uses exists, with one word in code, contract and Figma |
| Contracts and rules | What they say | Each one is written as a value, and the checks test it |
| Checks | Which rules get a check first | A failed check names the rule, and is fixed in the same pull request |
| Triage | The tracker and who decides | Only new parts reach triage, each with a label |

## Refining in Figma

The system is for AI tools to build in code. A designer can also refine a screen or a component in Figma, with the same tokens, components and names, and the Figma MCP server brings the refinement back to the code. It reaches the code in a pull request like any other change, so the harness checks it the same way, and a refined component goes to triage, where the design system owner decides.

## Use it

Once: `npm install` and `npx playwright install chromium`.

1. Point your AI coding tool at this folder and ask for a screen. It reads `AGENTS.md` first. A screen is one `.tsx` file in `screens/` that default-exports the screen and imports components from `../src`.
2. Fix what has one right answer: `npm run fix -- screens`. Then check it: `npm run preview -- screens/<name>.tsx` says whether it compiles and renders it to HTML. Then `npm run typecheck:screens -- screens` and `npm run score`. Each failed check names the rule, what broke and where the rule lives:

   ```
   MENU-01 (3 cells with 3+ buttons)  ← contracts/menu-button.md
   ```

3. When a token, a component or a contract changes, run `npm run system` (the system checks) and `python3 build-map.py` to rebuild the decision map and the check coverage.
4. Triage: on every pull request, `.github/workflows/triage.yml` runs the harness and sends each new part the AI labelled to the triage list, here GitHub Issues with the label `triage`. Each part gets one issue: a picture, its job, why the AI made it, its code, every screen and pull request where it appears, who made it, and the decision for the design system owner to tick. A part that appears again updates its issue. Locally, `node harness/triage.mjs screens` lists the parts. `harness/triage-to-issues.mjs` is the sender; another tracker needs only another sender.

A failed check is an error: a value that isn't a token, a restyled component, or a part built outside the system with no label. The harness names the rule and the file, the builder fixes it in the same pull request, and the harness runs again. `npm run fix -- screens` fixes, with no AI, only the errors that have one right answer: a literal colour that is exactly the value of one token becomes that token. Anything that needs a choice, such as a colour two tokens share, is left for the builder and listed. The screen is production-ready only when every check passes, so errors never reach triage. Run on every change, the same checks are the regression safeguards: an error that was fixed can't come back unnoticed.

Only new parts reach triage. A new part is never blocked: the build labels it with `data-new`, `data-job` and `data-why`, and adds `data-base` when it refines an existing component. Once every check passes, the screen ships and the part goes to triage. Triage takes the first decision that fits:

| Decision | When | What changes |
|---|---|---|
| Replaced by one that exists | A component already does the job, as it is | The screen switches to that component. The contracts get a line for this job, so the next build uses it. |
| Updates the component | It refines a component, and the change is worth keeping | The change goes into that component's contract, Figma and code. Every screen with the part switches back to the component. |
| Becomes a component | The same part reached triage more than once | It gets a contract and goes into Figma and code, with the same name. Every screen with the part switches to it. |
| Waits until it appears again | It reached triage once | The screen keeps the labelled part. If it reaches triage again, it becomes a component. |

## Token checks

Three checks guard the tokens and the names, the layer under the components:

- **TOK-01**: every `var(--name)` is a token that exists. A name an AI invents, such as `var(--color-primary)`, fails quietly in the browser; the harness catches it.
- **COL-03**: text reaches 4.5:1 against what is behind it (3:1 for large text), on every screen and for every text colour in `components.css`.
- **NAM-01**: a variant has the same word in the React prop, the CSS class, the contract and the Figma property.

They were added after the eval. Run on the eval's 27 screens with the tokens as they were, TOK-01 found nothing, and COL-03 failed 26 of 27 screens in every condition for one reason: the warning badge, `--warning` on `--tint-warning`, was 4.46:1. The screens did nothing wrong; the token did. One line in `tokens.css` (`#9a6200` → `#966000`, 4.63:1) fixed every screen. The scores in the eval below are from before these checks.

## The eval

Two conditions on the same tokens and React components, for a delivery operations product called Tolvane:

- **Components only**: `tokens.css`, `components.css`, the components in `src/` and a catalogue of them (`eval/catalogue.md`). No rules, no contracts, no templates, no `NewPart`.
- **Framework** (`eval/framework/`): the same tokens and components, plus the templates, `AGENTS.md`, the rules, the decision map and the contracts.

Each condition built a new feature, proof of delivery, three times. The feature has three screens (`eval/briefs.md`) and needs parts the system doesn't have, such as a photo, a signature and a file upload. That is where a design system is tested. One AI agent built each screen from a fresh start and never saw the harness, the other conditions or the other runs; `eval/prompt.md` has the prompt. The scores are the first build, before any fix. The eval screens are kept as they were built, so their buttons still use `ghost`, the old name of the `tertiary` variant.

| Condition | Checks passed | Per run | Production-ready screens | Unlabelled parts outside the system | Labelled new parts |
|---|---|---|---|---|---|
| Components only | 123 of 144 (85%) | 83%, 90%, 83% | 0 of 9 | 176 | 0 |
| Framework | 146 of 147 (99%) | 100%, 100%, 98% | 8 of 9 | 1 | 16 |

Every screen in both conditions compiled. The types stop a restyle through props, but not a `<style>` block aimed at a component's class: components only did that on 8 of 9 screens (CMP-04), and the harness caught each one. In the framework, one class name was left outside `NewPart` (CMP-01). The harness names the rule and the file for each, so the builder fixes them in the same pull request; nothing unlabelled ships.

The builders started 8 of 9 screens from a template: every queue from the list page, every proof from the detail page, and two of three rules screens from the form page. The 16 labelled new parts are mostly what the system really lacks: the photo, the signature, a thumbnail, a file upload and a multi-line message. The third rules screen used no template and said why at the top, as TPL-02 asks: it lists senders and edits one sender's rules on the same screen, which no template does. That screen goes to triage as a candidate template.

Unlabelled parts are class names outside the system that no labelled part holds, counted per screen. Labelled new parts are the distinct `data-new` names, counted per screen.

Run it again:

```
npm run eval:setup                      # writes eval/components-only/ and eval/framework/ from the system
# build eval/<condition>/run-<n>/<screen>.tsx with the prompt in eval/prompt.md
npm run typecheck:screens -- eval/*/run-*
npm run render -- eval/*/run-*
node harness/score.mjs eval/*/run-* --json eval/results.json
node eval/summary.mjs
```

## Refinement eval: the decision map (v1.1)

A change to the framework is tested the same way as the framework: the same three briefs, the same prompt, three runs per condition, one AI agent per screen from a fresh start. Only the change differs between the two conditions.

The change: in v1.0 the decision map copied every "never" line of every contract, with its check (Job | Use | Never | Checked by). The AI read each "never" twice, once in the map and once in the contract, and the "Checked by" column was for people, not for the AI. In v1.1 the map has three columns, Job | Use | Instead: "Instead" names the component for a nearby job, such as "A count: use a numeral" on the badge row. The "never" lines stay in the contracts, and the checks move to `check-coverage.md`.

- **Map, v1.0** (`eval/map-never/`): the framework as it is in v1.0.0.
- **Map, v1.1** (`eval/map-instead/`): the same framework, with the new map.

Both conditions were built with today's contracts, so they are compared with each other and not with the first eval. Their `AGENTS.md` leaves out the step that runs the harness, so the scores are the first build, as in the first eval.

| Condition | Map | One screen reads | Checks passed | Production-ready screens | Unlabelled parts outside the system | Labelled new parts |
|---|---|---|---|---|---|---|
| Map, v1.0 | 5.7 KB | 18.5 to 21.7 KB, 20.0 on average | 164 of 165 (99%) | 8 of 9 | 6 | 18 |
| Map, v1.1 | 3.4 KB | 15.1 to 19.4 KB, 17.1 on average | 163 of 165 (99%) | 7 of 9 | 3 | 17 |

The new map is 41% smaller, and a screen reads about 3 KB less, some 700 tokens. The screens came out the same: one check apart, inside the difference between runs of the same condition. In v1.0 one screen left 6 class names outside the system (CMP-01); in v1.1 one screen left 3 (CMP-01), and one labelled a new part as a refinement of another new part instead of a component (CMP-03). The harness named each one, so each would be fixed in the same pull request. The tokens a whole build used, about 140,000 per agent with the tools, the reading and the screen, didn't move in a way the map can explain: the files are a small part of a session.

So the map reads less with no loss, and v1.1 keeps it. `eval/results-refinement.json` has every check on every screen.

```
npm run eval:setup -- map-instead                     # writes eval/map-instead/ from the system
node harness/score.mjs eval/map-*/run-* --json eval/results-refinement.json
node eval/summary.mjs eval/results-refinement.json
```

## Versions

The kit uses version numbers: a change to how the framework works is a new minor version, with its own eval when it can change what the AI builds. `CHANGELOG.md` lists each version, and each one is a GitHub release with its git tag (`v1.0.0`, `v1.1.0`), so the files of any eval can be checked out as they were.

## Files

```
LICENSE              MIT
AGENTS.md            the agent workflow: what to read, in order
tokens.css           tokens
components.css       component styles
src/components/      one React component per contract; src/index.ts exports them
src/templates/       list page, detail page and form page
contracts/           one contract per component
rules.md             screen rules
decision-map.md      built from the contracts: job, component, and what to use instead
check-coverage.md    built from the contracts: every "never" line and its check, for people
CHANGELOG.md         what changed in each version
build-map.py         builds the decision map and the check coverage
harness/score.mjs    the checks on each screen
harness/system.mjs   the checks on the system: tokens, contrast, names
scripts/             preview, typecheck, render, make-eval
eval/
  briefs.md          the three feature briefs
  prompt.md          the prompt each builder got
  catalogue.md       what components only got besides the components
  components-only/   the system that condition got, and run-1 to run-3
  framework/         the framework, and run-1 to run-3
  results.json       every check on every screen
  map-never/         refinement eval: the framework with the v1.0 map, and run-1 to run-3
  map-instead/       refinement eval: the framework with the v1.1 map, and run-1 to run-3
  results-refinement.json  every check on every screen of the refinement eval
  summary.mjs        sums the results by condition
```

## What it doesn't cover

- Depth. The eval is small: it shows how the framework works.
- A large team. The builds were AI tools working alone, and I did the triage.
- Many people using the same design system. How triage works when many people add new parts at the same time is untested.
- Keyboard behaviour inside composite components. The components give the markup, the ARIA roles and the events (`onSelect`, `onToggle`), and the screen keeps the state. Arrow keys between tabs or menu items, and keeping focus inside an open dialog, are left to the product.

By [Nayara Marques](https://nayaramarques.com). MIT License.
