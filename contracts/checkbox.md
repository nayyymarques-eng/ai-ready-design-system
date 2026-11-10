# Checkbox

A yes or no choice inside a form, applied when the form is saved.

## Markup
```html
<label class="checkbox"><input type="checkbox"> Label</label>
```

## In React
`import { Checkbox } from '../src'`, from `src/components/Checkbox.tsx`. It renders the markup above.
```tsx
<Checkbox label="Email me a copy" />
```

## Variants and states
None.

## Use for
- A yes or no choice saved with a form

## Never
- A setting that applies at once (use a switch; no check yet)

## Lives in
Forms.

## Tokens
--s2

## Checked by
FIELD-01
