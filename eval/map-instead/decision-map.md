# Decision map

Built from the contracts by `build-map.py`. Find the job, use the component. "Instead" names the component for a
nearby job this one must not do. Everything a component must never do is in its contract.

| The job | Use | Instead |
|---|---|---|
| A count in the nav or next to a title | [Numeral](contracts/numeral.md) | - |
| A headline number on a dashboard or summary | [Stat](contracts/stat.md) | Read-only details such as a name or tax ID: use a list |
| A list or table with nothing to show yet | [Empty state](contracts/empty-state.md) | - |
| A message about the whole page | [Banner](contracts/banner.md) | A message about one field: use field__error |
| A person in a row or list | [Avatar](contracts/avatar.md) | - |
| A screen about one item: what it is, its facts, its history and what to do with it | [Detail page](contracts/detail-page.md) | - |
| A screen that lists many items of one kind, to find one and open it | [List page](contracts/list-page.md) | - |
| A screen where people change settings or fill in details, saved together | [Form page](contracts/form-page.md) | - |
| A setting that applies at once | [Switch](contracts/switch.md) | A choice that waits for a Save button: use a checkbox |
| A short decision that blocks the page | [Dialog](contracts/dialog.md) | - |
| A short list of items or events | [List](contracts/list.md) | A list of items compared on many attributes: use a table |
| A status | [Badge](contracts/badge.md) | A count: use a numeral |
| A titled part of a page (section) | [Section, stack, row, grid](contracts/layout.md) | - |
| A trend of one amount over up to 12 periods | [Bar chart](contracts/bar-chart.md) | - |
| A yes or no choice saved with a form | [Checkbox](contracts/checkbox.md) | A setting that applies at once: use a switch |
| Any single action | [Button](contracts/button.md) | - |
| Any value a person types or picks | [Field](contracts/field.md) | - |
| Columns of cards or stats (grid) | [Section, stack, row, grid](contracts/layout.md) | - |
| Confirm a destructive action (with a danger button) | [Dialog](contracts/dialog.md) | - |
| Filter one list | [Toggle group](contracts/toggle-group.md) | - |
| Grouping one piece of content on the page | [Card](contracts/card.md) | A card with a coloured border to show a message: use a banner |
| How far a task or setup is towards done | [Progress](contracts/progress.md) | - |
| Many items compared on the same attributes | [Table](contracts/table.md) | A table with no rows: use an empty state |
| Moving between the main places of the product | [Nav rail](contracts/nav-rail.md) | A badge for a count: use a numeral |
| Read-only details (label left, value right) | [List](contracts/list.md) | A list of items compared on many attributes: use a table |
| Several actions on one row or object | [Menu button](contracts/menu-button.md) | - |
| Switch between views of one object | [Tabs](contracts/tabs.md) | Tabs to filter a list: use a toggle group |
| The frame of every screen | [App shell](contracts/app-shell.md) | - |
| The main action of a screen or dialog (one primary) | [Button](contracts/button.md) | - |
| The product name at the top of the rail | [Nav rail](contracts/nav-rail.md) | A badge for a count: use a numeral |
| The title of a screen and its main actions | [Page header](contracts/page-header.md) | - |
