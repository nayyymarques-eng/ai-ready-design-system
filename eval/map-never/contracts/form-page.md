# Form page

A template: a whole screen where people change settings. The page header holds Save; below it, form sections, each in one card, in a column at most 720 wide. A danger zone goes last.

## Markup
```html
<div class="app">…nav rail…<main class="page">
  <div class="template template--form" data-template="form-page">
    <header class="page-header">…Save…</header>
    <section class="section"><h2 class="section__title">Company</h2><div class="card">…fields…</div></section>
  </div>
</main></div>
```

## In React
`import { FormPage } from '../src'`, from `src/templates/FormPage.tsx`. It renders the app shell and the markup above.
```tsx
<FormPage nav={<NavRail … />} title="Company settings" actions={<Button variant="primary">Save changes</Button>}>
  <Section title="Company" titleId="company"><Card><Field … /></Card></Section>
</FormPage>
```

## Variants and states
None.

## Use for
- A screen where people change settings or fill in details, saved together

## Never
- A Save button inside each card (no check yet)
- Fields directly on the page, outside a card (no check yet)
- The danger zone anywhere but last (no check yet)

## Lives in
The whole page, inside the app shell.

## Tokens
--s5

## Checked by
No check yet.
