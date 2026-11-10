# Stat

One headline number with its label.

## Markup
```html
<div class="stat">
  <span class="stat__label">Deliveries this month</span>
  <span class="stat__value">12,480</span>
</div>
```

## In React
`import { Stat } from '../src'`, from `src/components/Stat.tsx`. It renders the markup above.
```tsx
<Stat label="Deliveries this month" value="12,480" />
```

## Variants and states
None.

## Use for
- A headline number on a dashboard or summary

## Never
- Read-only details such as a name or tax ID (use a list; no check yet)

## Lives in
Cards, grids.

## Tokens
--type-numeral, --type-small

## Checked by
No check yet.
