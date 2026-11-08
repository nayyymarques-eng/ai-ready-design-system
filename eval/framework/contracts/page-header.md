# Page header

The title of the screen and its main actions.

## Markup
```html
<header class="page-header">
  <h1 class="page-header__title">Drivers</h1>
  <div class="page-header__actions">…buttons…</div>
</header>
```

## In React
`import { PageHeader } from '../src'`, from `src/components/PageHeader.tsx`. It renders the markup above.
```tsx
<PageHeader title="Invoice 2291" status={<Badge tone="warning">Awaiting approval</Badge>} actions={<Button variant="primary">Approve</Button>} />
```

## Variants and states
None.

## Use for
- The title of a screen and its main actions

## Never
- An h1 anywhere else
- More than one primary button in the actions

## Lives in
The top of the page, once.

## Tokens
--type-title

## Checked by
TTL-01, BTN-01
