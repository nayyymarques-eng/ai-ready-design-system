# Banner

A message about the whole page.

## Markup
```html
<div class="banner banner--warning" role="status"><p>…</p></div>
```

## In React
`import { Banner } from '../src'`, from `src/components/Banner.tsx`. It renders the markup above.
```tsx
<Banner tone="warning"><p>Dispatch cut-off in two hours.</p></Banner>   // tone: warning | critical, or none for info
```

## Variants and states
none (info), warning, critical.

One word per tone, everywhere: `tone="warning"` in React, `banner--warning` in CSS, `Tone=warning` in Figma.

## Use for
- A message about the whole page

## Never
- A card with a coloured border
- A message about one field (use field__error)

## Lives in
Under the page header.

## Tokens
--tint-info, --tint-warning, --tint-critical

## Checked by
BADGE-01, NAM-01
