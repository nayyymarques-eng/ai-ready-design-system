# List page

A template: a whole screen that lists many items of one kind, so people can find one and open it. Page header, an optional filter row, then the table or the empty state.

## Markup
```html
<div class="app">…nav rail…<main class="page">
  <div class="template" data-template="list-page">
    <header class="page-header">…</header>
    <div class="template__filters"><div class="toggle-group">…</div></div>
    <div class="table-scroll"><table class="table">…</table></div>
  </div>
</main></div>
```

## In React
`import { ListPage } from '../src'`, from `src/templates/ListPage.tsx`. It renders the app shell and the markup above.
```tsx
<ListPage nav={<NavRail … />} title="Drivers" actions={<Button variant="primary">Invite driver</Button>}
  filters={<ToggleGroup label="Filter drivers" items={[{ label: 'All', count: 42, selected: true }, { label: 'On duty', count: 18 }]} />}>
  <Table columns={…}>…</Table>
</ListPage>
```

## Variants and states
None. With nothing to list, the child is an empty state instead of the table.

## Use for
- A screen that lists many items of one kind, to find one and open it

## Never
- Two tables or two filter rows on one list page (no check yet)
- A filter row that makes the page scroll sideways on a phone (the template scrolls it on its own; no check yet)
- Cards instead of table rows for items people compare (no check yet)

## Lives in
The whole page, inside the app shell.

## Tokens
--s5

## Checked by
Review only.
