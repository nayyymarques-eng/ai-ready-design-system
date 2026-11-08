# Screen rules

The rules for what sits between components. Each component's own rules live in its contract (`contracts/`).
Every rule has an ID and one line you can pass or fail. Rules marked *(checked)* are checked by the harness on every screen.
On any conflict between this file and an existing screen, this file wins.

## 1. Components (CMP): few, and one way in
- **CMP-01** Build only with components that have a contract. Every class on the screen belongs to one. *(checked)*
- **CMP-02** No new variants. A contract lists every variant there is.
- **CMP-03** If no component fits the job, you may build one, and the build continues. Mark its root `data-new="name"` with `data-job="what it is for"` and `data-why="why no contract fit"`. All its classes start with `x-`. *(checked)*
- **CMP-04** Never restyle a component with a `style` attribute or a `<style>` block. The only allowed style attribute is `--value` on progress and bar chart. If a component needs to look different, it is a new component (CMP-03). *(checked)*

## 2. Surfaces (SRF)
- **SRF-01** The page background is `--surface-sunken`. Content sits on a card, table, list or empty state, never directly on the page.

## 3. Titles (TTL)
- **TTL-01** One `<h1>` per screen, and it is the page header title. *(checked)*
- **TTL-02** Headings go in order: h1, then h2, then h3. Never skip a level. *(checked)*
- **TTL-03** Titles are sentence case, without a final full stop.

## 4. Type (TYP)
- **TYP-01** Font sizes come only from the type tokens (`--type-*`). No `font-size` or `font` value in pixels. *(checked)*

## 5. Geometry (GEO)
- **GEO-01** Corners use `--radius` (6) or `--radius-pill`. Nothing else.

## 6. Spacing (SPC)
- **SPC-01** Every gap is a spacing token: 4, 8, 12, 16, 24, 32, 48, 64. No other pixel value for margin, padding or gap. *(checked)*
- **SPC-02** 24 between sections of a page (the page does it), 16 inside a section or card, 8 between buttons.

## 7. Colour (COL)
- **COL-01** No literal colour anywhere on a screen: no hex, rgb, hsl or named colour. Only tokens. *(checked)*

## 8. Elevation (ELV)
- **ELV-01** Two levels only: `--raise-1` (cards) and `--raise-2` (menus, dialogs).

## 9. States (STA)
- **STA-01** The current item is `is-current`; a selected filter is `is-selected`; an open menu is `is-open`. No other state class.

## 10. Motion (MOT)
- **MOT-01** Only `--duration` and `--ease`. Animate opacity and transform only.

## 11. Layout (LAY)
- **LAY-01** Nothing scrolls sideways at 375px wide. Wide tables scroll inside `.table-scroll`. *(checked)*

## 12. Not decided, not built
Ask before shipping a lookalike of anything here.
- Not decided: breakpoints beyond 720, table density, date formats.
- Not built: line or pie charts, date picker, file upload, toast, pagination, stepper, search field with suggestions, textarea.
If a screen needs one of these, build it under CMP-03 and log it.
