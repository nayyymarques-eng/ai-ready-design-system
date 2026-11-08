# Progress

How far a task is towards done.

## Markup
```html
<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3">
  <div class="progress__label"><span>3 of 5 steps done</span><span class="numeral">60%</span></div>
  <div class="progress__track"><div class="progress__fill" style="--value:60"></div></div>
</div>
```

## In React
`import { Progress } from '../src'`, from `src/components/Progress.tsx`. It renders the markup above.
```tsx
<Progress value={3} max={5} label="3 of 5 steps done" />
```

## Variants and states
None. --value is 0 to 100, set with style="--value:60" (the only allowed style attribute).

## Use for
- How far a task or setup is towards done

## Never
- A hand-built bar
- A percentage in a badge

## Lives in
Cards, onboarding.

## Tokens
--accent, --surface-sunken, --radius-pill

## Checked by
Review only.
