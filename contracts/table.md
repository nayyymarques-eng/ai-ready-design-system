# Table

Rows of items with the same attributes. Wide tables scroll inside their box.

## Markup
```html
<div class="table-scroll"><table class="table">
  <thead><tr><th>Name</th><th class="is-number">Amount</th></tr></thead>
  <tbody>…</tbody>
</table></div>
```

## In React
`import { Table, Tr, Td } from '../src'`, from `src/components/Table.tsx`. It renders the markup above.
```tsx
<Table columns={[{ label: 'Driver' }, { label: 'Stops', numeric: true }]}>
  <Tr><Td>Ana Moreira</Td><Td numeric>18</Td></Tr>
</Table>
```

## Variants and states
is-number on a th or td right-aligns amounts and counts.

## Use for
- Many items compared on the same attributes

## Never
- Amounts that are not right-aligned
- A table with no rows (use an empty state)
- A table outside table-scroll

## Lives in
The page or a section, never inside a card.

## Tokens
--surface, --border, --type-small

## Checked by
TABLE-01, LAY-01
