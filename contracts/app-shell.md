# App shell

The frame of every screen: the nav rail on the left, the page on the right. On phones the rail becomes a top bar.

## Markup
```html
<div class="app">
  <nav class="nav-rail">…</nav>
  <main class="page">…</main>
</div>
```

## In React
`import { AppShell } from '../src'`, from `src/components/AppShell.tsx`. It renders the markup above.
```tsx
<AppShell nav={<NavRail brand="Tolvane" items={[{ label: 'Drivers', href: '#', count: 24, current: true }]} />}>
  <PageHeader title="Drivers" />
  …
</AppShell>
```

## Variants and states
None.

## Use for
- The frame of every screen

## Never
- A second sidebar or a custom frame (no check yet)

## Lives in
The body, once.

## Tokens
--surface, --surface-sunken, --border

## Checked by
No check yet.
