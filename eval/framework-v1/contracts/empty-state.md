# Empty state

What a list or table shows when it has nothing yet, and the action that fills it.

## Markup
```html
<div class="empty-state">
  <h2 class="empty-state__title">No invoices yet</h2>
  <p>…</p>
  <button class="btn btn--primary">…</button>
</div>
```

## In React
`import { EmptyState } from '../src'`, from `src/components/EmptyState.tsx`. It renders the markup above.
```tsx
<EmptyState title="No drivers yet" action={<Button variant="primary">Invite driver</Button>}><p>…</p></EmptyState>
```

## Variants and states
None.

## Use for
- A list or table with nothing to show yet

## Never
- An empty table

## Lives in
Where the list or table will be.

## Tokens
--s7, --type-heading

## Checked by
BTN-01
