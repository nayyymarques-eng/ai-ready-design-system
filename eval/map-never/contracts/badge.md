# Badge

Shows a status in a word.

## Markup
```html
<span class="badge badge--positive">Paid</span>
```

## In React
`import { Badge } from '../src'`, from `src/components/Badge.tsx`. It renders the markup above.
```tsx
<Badge tone="positive">Paid</Badge>   // tone: positive | warning | critical | info, or none for neutral
```

## Variants and states
positive, warning, critical, info, or none for neutral.

One word per tone, everywhere: `tone="positive"` in React, `badge--positive` in CSS, `Tone=positive` in Figma.

## Use for
- A status

## Never
- Coloured text to show a status (checked by BADGE-01)
- A count (use a numeral; checked by NUM-01)

## Lives in
Table cells, list items, next to a title.

## Tokens
--tint-*, --positive, --warning, --critical, --info

## Checked by
BADGE-01, NUM-01, NAM-01
