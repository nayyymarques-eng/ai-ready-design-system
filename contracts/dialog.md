# Dialog

Asks for a decision or a confirmation over the page.

## Markup
```html
<div class="dialog-backdrop">
  <div class="dialog" role="dialog" aria-labelledby="d1">
    <h2 class="dialog__title" id="d1">…</h2>
    <p>…</p>
    <div class="dialog__actions">…</div>
  </div>
</div>
```

## Variants and states
None.

## Use for
- Confirm a destructive action (with a danger button)
- A short decision that blocks the page

## Never
- A browser confirm()
- A long form

## Lives in
Over the page, one at a time.

## Tokens
--raise-2, --radius, --s5

## Checked by
BTN-01
