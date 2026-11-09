# Decision map

Built from the contracts by `build-map.py`. Find the job, use the component, avoid what it says not to do.

| The job | Use | Never | Checked by |
|---|---|---|---|
| A count in the nav or next to a title | [Numeral](contracts/numeral.md) | A badge for a count | NUM-01 |
| A headline number on a dashboard or summary | [Stat](contracts/stat.md) | Read-only details such as a name or tax ID (use a list) | Review only. |
| A list or table with nothing to show yet | [Empty state](contracts/empty-state.md) | An empty table | BTN-01 |
| A message about the whole page | [Banner](contracts/banner.md) | A card with a coloured border; A message about one field (use field__error) | BADGE-01, NAM-01 |
| A person in a row or list | [Avatar](contracts/avatar.md) | A product logo | Review only. |
| A screen about one item: what it is, its facts, its history and what to do with it | [Detail page](contracts/detail-page.md) | The item's main actions anywhere but the page header; A third column; History or facts in the main column when the side column is free | Review only. |
| A screen that lists many items of one kind, to find one and open it | [List page](contracts/list-page.md) | Two tables or two filter rows on one list page; A filter row that makes the page scroll sideways on a phone (the template scrolls it on its own); Cards instead of table rows for items people compare | Review only. |
| A screen where people change settings or fill in details, saved together | [Form page](contracts/form-page.md) | A Save button inside each card; Fields directly on the page, outside a card; The danger zone anywhere but last | Review only. |
| A setting that applies at once | [Switch](contracts/switch.md) | A choice that waits for a Save button (use a checkbox) | FIELD-01 |
| A short decision that blocks the page | [Dialog](contracts/dialog.md) | A browser confirm(); A long form | BTN-01 |
| A short list of items or events | [List](contracts/list.md) | A list of items compared on many attributes (use a table) | Review only. |
| A status | [Badge](contracts/badge.md) | Coloured text to show a status; A count (use a numeral) | BADGE-01, NUM-01, NAM-01 |
| A titled part of a page (section) | [Section, stack, row, grid](contracts/layout.md) | Custom two-column layouts with their own CSS; Spacing set by hand on a wrapper | SPC-01 |
| A trend of one amount over up to 12 periods | [Bar chart](contracts/bar-chart.md) | A hand-built chart in SVG or CSS; More than one colour besides is-current | Review only. |
| A yes or no choice saved with a form | [Checkbox](contracts/checkbox.md) | A setting that applies at once (use a switch) | FIELD-01 |
| Any single action | [Button](contracts/button.md) | Two primary buttons in the same header, card or dialog; A button with no visible text and no aria-label; A link styled as a button to go somewhere | BTN-01, BTN-02, NAM-01 |
| Any value a person types or picks | [Field](contracts/field.md) | An input with no label; A placeholder used as the label | FIELD-01 |
| Columns of cards or stats (grid) | [Section, stack, row, grid](contracts/layout.md) | Custom two-column layouts with their own CSS; Spacing set by hand on a wrapper | SPC-01 |
| Confirm a destructive action (with a danger button) | [Dialog](contracts/dialog.md) | A browser confirm(); A long form | BTN-01 |
| Filter one list | [Toggle group](contracts/toggle-group.md) | Tabs to filter a list | Review only. |
| Grouping one piece of content on the page | [Card](contracts/card.md) | A card inside a card; A card with a coloured border to show a message (use a banner) | CARD-01 |
| How far a task or setup is towards done | [Progress](contracts/progress.md) | A hand-built bar; A percentage in a badge | Review only. |
| Many items compared on the same attributes | [Table](contracts/table.md) | Amounts that are not right-aligned; A table with no rows (use an empty state); A table outside table-scroll | TABLE-01, LAY-01 |
| Moving between the main places of the product | [Nav rail](contracts/nav-rail.md) | A logo image or a custom brand block; A badge for a count (use a numeral) | NUM-01 |
| Read-only details (label left, value right) | [List](contracts/list.md) | A list of items compared on many attributes (use a table) | Review only. |
| Several actions on one row or object | [Menu button](contracts/menu-button.md) | A row of three or more buttons in a table cell; A button with a chevron that pretends to be a menu | MENU-01 |
| Switch between views of one object | [Tabs](contracts/tabs.md) | A second tab row on the same screen; Tabs to filter a list (use a toggle group) | TABS-01 |
| The frame of every screen | [App shell](contracts/app-shell.md) | A second sidebar or a custom frame | Review only. |
| The main action of a screen or dialog (one primary) | [Button](contracts/button.md) | Two primary buttons in the same header, card or dialog; A button with no visible text and no aria-label; A link styled as a button to go somewhere | BTN-01, BTN-02, NAM-01 |
| The product name at the top of the rail | [Nav rail](contracts/nav-rail.md) | A logo image or a custom brand block; A badge for a count (use a numeral) | NUM-01 |
| The title of a screen and its main actions | [Page header](contracts/page-header.md) | An h1 anywhere else; More than one primary button in the actions | TTL-01, BTN-01 |
