# Detail page

A template: a whole screen about one item. The page header has its title, status and actions; the main column holds what the item is, the side column its facts, the people involved and its history.

## Markup
```html
<div class="app">…nav rail…<main class="page">
  <div class="template" data-template="detail-page">
    <header class="page-header">…</header>
    <div class="template__columns">
      <div class="template__main">…sections with cards, tables or lists…</div>
      <div class="template__aside">…sections with lists…</div>
    </div>
  </div>
</main></div>
```

## In React
`import { DetailPage } from '../src'`, from `src/templates/DetailPage.tsx`. It renders the app shell and the markup above.
```tsx
<DetailPage nav={<NavRail … />} title="Invoice 2291" status={<Badge tone="warning">Awaiting approval</Badge>}
  actions={<><Button variant="secondary">Reject</Button><Button variant="primary">Approve</Button></>}
  main={<Section title="Line items" titleId="items"><Table …/></Section>}
  aside={<Section title="Carrier" titleId="carrier"><Card><List>…</List></Card></Section>} />
```

## Variants and states
None. Below 960px wide the side column moves under the main one.

## Use for
- A screen about one item: what it is, its facts, its history and what to do with it

## Never
- The item's main actions anywhere but the page header
- A third column
- History or facts in the main column when the side column is free

## Lives in
The whole page, inside the app shell.

## Tokens
--s5

## Checked by
Review only.
