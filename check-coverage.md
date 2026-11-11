# Check coverage

Built from the contracts by `build-map.py`, for the people who keep the system. The AI does not read it.
Each "never" line of every contract, and the check that catches it: 15 of 48 have one.

| Contract | Never | Checked by |
|---|---|---|
| [App shell](contracts/app-shell.md) | A second sidebar or a custom frame | No check yet |
| [Avatar](contracts/avatar.md) | A product logo | No check yet |
| [Badge](contracts/badge.md) | Coloured text to show a status | BADGE-01 |
| [Badge](contracts/badge.md) | A count (use a numeral) | NUM-01 |
| [Banner](contracts/banner.md) | A card with a coloured border | No check yet |
| [Banner](contracts/banner.md) | A message about one field (use field__error) | No check yet |
| [Bar chart](contracts/bar-chart.md) | A hand-built chart in SVG or CSS | No check yet |
| [Bar chart](contracts/bar-chart.md) | More than one colour besides is-current | No check yet |
| [Button](contracts/button.md) | Two primary buttons in the same header, card or dialog | BTN-01 |
| [Button](contracts/button.md) | A button with no visible text and no aria-label | BTN-02 |
| [Button](contracts/button.md) | A link styled as a button to go somewhere | No check yet |
| [Card](contracts/card.md) | A card inside a card | CARD-01 |
| [Card](contracts/card.md) | A card with a coloured border to show a message (use a banner) | No check yet |
| [Checkbox](contracts/checkbox.md) | A setting that applies at once (use a switch) | No check yet |
| [Detail page](contracts/detail-page.md) | The item's main actions anywhere but the page header | No check yet |
| [Detail page](contracts/detail-page.md) | A third column | No check yet |
| [Detail page](contracts/detail-page.md) | History or facts in the main column when the side column is free | No check yet |
| [Dialog](contracts/dialog.md) | A browser confirm() | No check yet |
| [Dialog](contracts/dialog.md) | A long form | No check yet |
| [Empty state](contracts/empty-state.md) | An empty table | No check yet |
| [Field](contracts/field.md) | An input with no label | FIELD-01 |
| [Field](contracts/field.md) | A placeholder used as the label | FIELD-01 |
| [Form page](contracts/form-page.md) | A Save button inside each card | No check yet |
| [Form page](contracts/form-page.md) | Fields directly on the page, outside a card | No check yet |
| [Form page](contracts/form-page.md) | The danger zone anywhere but last | No check yet |
| [Section, stack, row, grid](contracts/layout.md) | Custom two-column layouts with their own CSS | No check yet |
| [Section, stack, row, grid](contracts/layout.md) | Spacing set by hand on a wrapper | No check yet |
| [List page](contracts/list-page.md) | Two tables or two filter rows on one list page | No check yet |
| [List page](contracts/list-page.md) | A filter row that makes the page scroll sideways on a phone (the template scrolls it on its own) | No check yet |
| [List page](contracts/list-page.md) | Cards instead of table rows for items people compare | No check yet |
| [List](contracts/list.md) | A list of items compared on many attributes (use a table) | No check yet |
| [Menu button](contracts/menu-button.md) | A row of three or more buttons in a table cell | MENU-01 |
| [Menu button](contracts/menu-button.md) | A button with a chevron that pretends to be a menu | No check yet |
| [Nav rail](contracts/nav-rail.md) | A logo image or a custom brand block | No check yet |
| [Nav rail](contracts/nav-rail.md) | A badge for a count (use a numeral) | NUM-01 |
| [Numeral](contracts/numeral.md) | A badge for a count | NUM-01 |
| [Page header](contracts/page-header.md) | An h1 anywhere else | TTL-01 |
| [Page header](contracts/page-header.md) | More than one primary button in the actions | BTN-01 |
| [Progress](contracts/progress.md) | A hand-built bar | No check yet |
| [Progress](contracts/progress.md) | A percentage in a badge | No check yet |
| [Stat](contracts/stat.md) | Read-only details such as a name or tax ID (use a list) | No check yet |
| [Switch](contracts/switch.md) | A choice that waits for a Save button (use a checkbox) | No check yet |
| [Table](contracts/table.md) | Amounts that are not right-aligned | TABLE-01 |
| [Table](contracts/table.md) | A table with no rows (use an empty state) | No check yet |
| [Table](contracts/table.md) | A table outside table-scroll | LAY-01 |
| [Tabs](contracts/tabs.md) | A second tab row on the same screen | TABS-01 |
| [Tabs](contracts/tabs.md) | Tabs to filter a list (use a toggle group) | No check yet |
| [Toggle group](contracts/toggle-group.md) | Tabs to filter a list | No check yet |
