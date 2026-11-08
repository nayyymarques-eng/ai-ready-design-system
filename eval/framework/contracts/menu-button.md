# Menu button

One "⋯" button that opens a list of actions.

## Markup
```html
<div class="menu-button">
  <button class="btn btn--ghost" aria-label="More actions">⋯</button>
  <div class="menu"><button class="menu__item">Edit</button></div>
</div>
```

## In React
`import { MenuButton } from '../src'`, from `src/components/MenuButton.tsx`. It renders the markup above.
```tsx
<MenuButton label="More actions" items={[{ label: 'Edit' }, { label: 'Send reminder' }, { label: 'Deactivate' }]} />
```

## Variants and states
None. States: is-open shows the menu.

## Use for
- Several actions on one row or object

## Never
- A row of three or more buttons in a table cell
- A button with a chevron that pretends to be a menu

## Lives in
Table cells, card headers, page header actions.

## Tokens
--surface, --raise-2, --radius

## Checked by
MENU-01
