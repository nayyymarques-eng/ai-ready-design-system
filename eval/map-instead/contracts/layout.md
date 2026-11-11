# Section, stack, row, grid

Four layout helpers. A section is a titled part of a page; a stack puts things in a column 16 apart; a row puts things side by side 8 apart; a grid makes columns at least 220 wide.

## Markup
```html
<section class="section">
  <h2 class="section__title">Recent</h2>
  <div class="stack">…</div>
</section>
<div class="row">…</div>
<div class="grid">…</div>
```

## In React
`import { Section, Stack, Row, Grid } from '../src'`, from `src/components/Layout.tsx`. It renders the markup above.
```tsx
<Section title="Recent" titleId="recent"><Stack>…</Stack></Section>
<Row>…</Row>  <Grid>…</Grid>
```

## Variants and states
None.

## Use for
- A titled part of a page (section)
- Columns of cards or stats (grid)

## Never
- Custom two-column layouts with their own CSS (no check yet)
- Spacing set by hand on a wrapper (no check yet)

## Lives in
Inside the page, cards and dialogs.

## Tokens
--s2, --s4, --type-heading

## Checked by
SPC-01
