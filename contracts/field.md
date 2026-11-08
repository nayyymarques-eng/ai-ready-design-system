# Field

A labelled input or select, with an optional hint or error.

## Markup
```html
<div class="field">
  <label class="field__label" for="name">Name</label>
  <input class="field__input" id="name">
  <p class="field__hint">…</p>
</div>
```

## In React
`import { Field } from '../src'`, from `src/components/Field.tsx`. It renders the markup above.
```tsx
<Field id="name" label="Company name" hint="As on your invoices" />
<Field id="currency" label="Currency" options={['EUR', 'GBP']} />
```

## Variants and states
Input or select. A field__error replaces the hint when the value is wrong.

## Use for
- Any value a person types or picks

## Never
- An input with no label
- A placeholder used as the label

## Lives in
Cards, dialogs.

## Tokens
--control-height, --type-body-strong, --type-small, --critical

## Checked by
FIELD-01
