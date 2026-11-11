# Bar chart

A few values over time, as bars.

## Markup
```html
<div class="bar-chart" role="img" aria-label="Deliveries, last six months">
  <div class="bar-chart__col">
    <span class="bar-chart__value">10.2k</span>
    <div class="bar-chart__bar" style="--value:85"></div>
    <span class="bar-chart__label">Jun</span>
  </div>
  …
</div>
```

## In React
`import { BarChart } from '../src'`, from `src/components/BarChart.tsx`. It renders the markup above.
```tsx
<BarChart label="Deliveries, last six months" bars={[{ label: 'Jun', display: '10.2k', value: 10200, current: true }]} />
```

## Variants and states
is-current on the bar that matters most. --value is 0 to 100 against the tallest bar, set with style="--value:85".

## Use for
- A trend of one amount over up to 12 periods

## Never
- A hand-built chart in SVG or CSS (no check yet)
- More than one colour besides is-current (no check yet)

## Lives in
Cards.

## Tokens
--line, --accent, --type-small

## Checked by
No check yet.
