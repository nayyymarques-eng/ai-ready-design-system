# Screen rules

The rules for what sits between components. Each component's own rules live in its contract (`contracts/`).
Every rule has an ID and one line you can pass or fail. Rules marked *(checked)* are checked by the harness on every screen.
On any conflict between this file and an existing screen, this file wins.

## 1. Components (CMP): few, and one way in
- **CMP-01** Build only with components that have a contract. Every class on the screen belongs to one. *(checked)*
- **CMP-02** No new variants. A contract lists every variant there is.
- **CMP-03** If no component fits the job, you may build one, and the build continues. Label its root `data-new="name"` with `data-job="what it is for"` and `data-why="why no contract fit"`. If it starts from a component and changes it on purpose (a refinement), add `data-base="that component"`. All its classes start with `x-`. In React, the root is `<NewPart>` (`src/components/NewPart.tsx`): `job` and `why` are required, so an unlabelled new part doesn't compile. *(checked)*
- **CMP-04** Never restyle a component with a `style` attribute or a `<style>` block. The only allowed style attribute is `--value` on progress and bar chart. If a component needs to look different, build the new look under CMP-03, with `data-base`. In React, components take no `className` or `style`, so a restyle doesn't compile. A screen's own styles, for its `x-` classes only, go in its `css` export. *(checked)*

## 1a. Templates (TPL): start from a whole screen
- **TPL-01** Start every screen from the template that fits its job: list page, detail page or form page (`contracts/`, and the decision map lists them by job). Fill its slots with components.
- **TPL-02** If no template fits, build the screen from the app shell and the layout components (section, stack, row, grid), and say in a comment at the top of the screen which template came closest and why it didn't fit. That screen goes to triage like a new part: it may become a template.
- **TPL-03** Never restyle a template or change its columns. If the layout needs to change, it is TPL-02.

## 2. Code (TSC)
- **TSC-01** A screen in React compiles with no TypeScript errors (`npm run typecheck:screens`). *(checked)*

## 3. Surfaces (SRF)
- **SRF-01** The page background is `--surface-sunken`. Content sits on a card, table, list or empty state, never directly on the page.

## 4. Titles (TTL)
- **TTL-01** One `<h1>` per screen, and it is the page header title. *(checked)*
- **TTL-02** Headings go in order: h1, then h2, then h3. Never skip a level. *(checked)*
- **TTL-03** Titles are sentence case, without a final full stop.

## 5. Type (TYP)
- **TYP-01** Font sizes come only from the type tokens (`--type-*`). No `font-size` or `font` value in pixels. *(checked)*

## 6. Geometry (GEO)
- **GEO-01** Corners use `--radius` (6) or `--radius-pill`. Nothing else.

## 7. Spacing (SPC)
- **SPC-01** Every gap is a spacing token: 4, 8, 12, 16, 24, 32, 48, 64. No other pixel value for margin, padding or gap. *(checked)*
- **SPC-02** 24 between sections of a page (the page does it), 16 inside a section or card, 8 between buttons.

## 8. Colour (COL)
- **COL-01** No literal colour anywhere on a screen: no hex, rgb, hsl or named colour. Only tokens. *(checked)*

## 9. Elevation (ELV)
- **ELV-01** Two levels only: `--raise-1` (cards) and `--raise-2` (menus, dialogs).

## 10. States (STA)
- **STA-01** The current item is `is-current`; a selected filter is `is-selected`; an open menu is `is-open`. No other state class.

## 11. Motion (MOT)
- **MOT-01** Only `--duration` and `--ease`. Animate opacity and transform only.

## 12. Layout (LAY)
- **LAY-01** Nothing scrolls sideways at 375px wide. Wide tables scroll inside `.table-scroll`. *(checked)*

## 13. Not decided, not built
Ask before shipping a lookalike of anything here.
- Not decided: breakpoints beyond 720, table density, date formats.
- Not built: line or pie charts, date picker, file upload, toast, pagination, stepper, search field with suggestions, textarea.
If a screen needs one of these, build it under CMP-03 and label it.
