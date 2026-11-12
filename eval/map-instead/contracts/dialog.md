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

## In React
`import { Dialog } from '../src'`, from `src/components/Dialog.tsx`. It renders the markup above.
```tsx
<Dialog id="reject" title="Reject this invoice?" actions={<><Button variant="secondary">Cancel</Button><Button variant="danger">Reject</Button></>}>
  <Field id="reason" label="Reason" />
</Dialog>
```

## Variants and states
None.

## Use for
- Confirm a destructive action (with a danger button)
- A short decision that blocks the page

## Never
- A browser confirm() (no check yet)
- A long form (no check yet)

## Lives in
Over the page, one at a time.

## Tokens
--raise-2, --radius, --s5

## Checked by
BTN-01
