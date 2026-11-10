# Card

A white surface that groups one piece of content.

## Markup
```html
<div class="card">…</div>
```

## In React
`import { Card } from '../src'`, from `src/components/Card.tsx`. It renders the markup above.
```tsx
<Card>…</Card>
```

## Variants and states
None.

## Use for
- Grouping one piece of content on the page

## Never
- A card inside a card (checked by CARD-01)
- A card with a coloured border to show a message (use a banner; no check yet)

## Lives in
The page, a grid or a section.

## Tokens
--surface, --border, --radius, --raise-1, --s5

## Checked by
CARD-01
