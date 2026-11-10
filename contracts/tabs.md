# Tabs

Switches between views of one object.

## Markup
```html
<div class="tabs" role="tablist">
  <button class="tabs__item is-current" role="tab">Overview</button>
  <button class="tabs__item" role="tab">Documents</button>
</div>
```

## In React
`import { Tabs } from '../src'`, from `src/components/Tabs.tsx`. It renders the markup above.
```tsx
<Tabs label="Invoice" items={[{ label: 'Overview', current: true }, { label: 'History' }]} />
```

## Variants and states
None. States: is-current on one tab.

## Use for
- Switch between views of one object

## Never
- A second tab row on the same screen (checked by TABS-01)
- Tabs to filter a list (use a toggle group; no check yet)

## Lives in
Under the page header, once per screen.

## Tokens
--accent, --type-body-strong

## Checked by
TABS-01
