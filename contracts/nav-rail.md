# Nav rail

The product name and the list of places in the product. The current place is marked.

## Markup
```html
<nav class="nav-rail">
  <span class="nav-rail__brand">Tolvane</span>
  <a class="nav-rail__item is-current" href="#">Drivers <span class="numeral">24</span></a>
</nav>
```

## Variants and states
None. States: is-current on one item.

## Use for
- The product name at the top of the rail
- Moving between the main places of the product

## Never
- A logo image or a custom brand block
- A badge for a count (use a numeral)

## Lives in
The app shell only.

## Tokens
--type-heading, --type-body-strong, --surface-sunken

## Checked by
NUM-01
