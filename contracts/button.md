# Button

Starts one action. The variant says how important the action is.

## Markup
```html
<button class="btn btn--primary">Save</button>
```

## Variants and states
primary (the main action), secondary (other actions), ghost (quiet actions, menu triggers), danger (destroys something, always after a confirmation). Nothing else.

## Use for
- The main action of a screen or dialog (one primary)
- Any single action

## Never
- Two primary buttons in the same header, card or dialog
- A button with no visible text and no aria-label
- A link styled as a button to go somewhere

## Lives in
Page header, cards, dialogs, empty states.

## Tokens
--accent, --on-accent, --critical, --control-height, --radius

## Checked by
BTN-01, BTN-02
