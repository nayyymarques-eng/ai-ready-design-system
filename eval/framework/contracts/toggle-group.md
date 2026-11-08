# Toggle group

Filters one list. One item is selected.

## Markup
```html
<div class="toggle-group" role="group" aria-label="Filter">
  <button class="toggle-group__item is-selected">All</button>
  <button class="toggle-group__item">Active</button>
</div>
```

## In React
`import { ToggleGroup } from '../src'`, from `src/components/ToggleGroup.tsx`. It renders the markup above.
```tsx
<ToggleGroup label="Filter drivers" items={[{ label: 'All', count: 24, selected: true }, { label: 'On duty', count: 18 }]} />
```

## Variants and states
None. States: is-selected on one item.

## Use for
- Filter one list

## Never
- Tabs to filter a list

## Lives in
Above the list or table it filters.

## Tokens
--surface-sunken, --radius

## Checked by
Review only.
