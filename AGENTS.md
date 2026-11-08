# Building a screen with this system

Read in this order:
1. `rules.md`: the screen rules, including how to add a new component.
2. `decision-map.md`: find the job you need, and the component for it. Start with the screen's job: the map lists the templates (list page, detail page, form page), and a screen starts from the one that fits.
3. The contract of every component you use, in `contracts/`. It says what the component is, its markup, its variants, and what never to do with it.

Load `tokens.css` then `components.css`. Nothing outside the contracts is part of the system.

## In React
Each component is in `src/components/`, and `src/index.ts` exports them all. A screen is one `.tsx` file that default-exports the screen, imports components from `src`, and may export `title` (the page title) and `css` (styles for its own `x-` classes only). The props are typed: a variant that doesn't exist, a `className` or a `style` on a component doesn't compile. A part the system doesn't have is a `<NewPart>` (rule CMP-03). Templates are in `src/templates/` and exported from `src` too: `ListPage`, `DetailPage`, `FormPage`.
