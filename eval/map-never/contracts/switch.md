# Switch

Turns a setting on or off at once.

## Markup
```html
<label class="switch"><input type="checkbox" role="switch"> Label</label>
```

## In React
`import { Switch } from '../src'`, from `src/components/Switch.tsx`. It renders the markup above.
```tsx
<Switch label="Email me when a delivery fails" defaultChecked />
```

## Variants and states
None.

## Use for
- A setting that applies at once

## Never
- A choice that waits for a Save button (use a checkbox; no check yet)

## Lives in
Settings lists and cards.

## Tokens
--accent, --line, --radius-pill

## Checked by
FIELD-01
