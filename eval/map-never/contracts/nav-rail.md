# Nav rail

The product name and the list of places in the product. The current place is marked.

## Markup
```html
<nav class="nav-rail">
  <span class="nav-rail__brand">Tolvane</span>
  <a class="nav-rail__item is-current" href="#">Drivers <span class="numeral">24</span></a>
</nav>
```

## In React
`import { NavRail } from '../src'`, from `src/components/NavRail.tsx`. It renders the markup above.
```tsx
<NavRail brand="Tolvane" items={[{ label: 'Drivers', href: '#', count: 24, current: true }]} />
```

## Variants and states
None. States: is-current on one item.

## Use for
- The product name at the top of the rail
- Moving between the main places of the product

## Never
- A logo image or a custom brand block (no check yet)
- A badge for a count (use a numeral; checked by NUM-01)

## Lives in
The app shell only.

## Tokens
--type-heading, --type-body-strong, --surface-sunken

## Checked by
NUM-01
