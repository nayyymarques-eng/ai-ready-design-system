# List

Rows of items, each with content on the left and a value or action on the right.

## Markup
```html
<div class="list">
  <div class="list__item"><span>Tax ID</span><strong>PT 234 567 890</strong></div>
</div>
```

## In React
`import { List, ListItem } from '../src'`, from `src/components/List.tsx`. It renders the markup above.
```tsx
<List>
  <ListItem label="Tax ID" value="PT 234 567 890" />
</List>
```

## Variants and states
None.

## Use for
- A short list of items or events
- Read-only details (label left, value right)

## Never
- A list of items compared on many attributes (use a table; no check yet)

## Lives in
The page, sections, cards.

## Tokens
--surface, --border, --s3, --s4

## Checked by
Review only.
