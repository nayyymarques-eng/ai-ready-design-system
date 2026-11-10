# The builder prompt

Each screen of each run was built by one AI agent from a fresh start, with the prompt below. The agent never saw the harness, the other condition or the other runs. The two conditions differ in one line: which folder is the design system, and where to start reading.

```
Build one screen of a web app in React and TypeScript.

Product: Tolvane, software for a delivery operations team. Tolvane is adding a new
feature, proof of delivery: when drivers hand over a parcel, they take a photo and
collect a signature, and the operations team reviews the proof when a customer
disputes a delivery.
Screen: <name>. <the brief from briefs.md>
Invent realistic content.

Your design system is the folder eval/<condition>, and only that folder. <start line>
Write one file, eval/<condition>/run-<n>/<name>.tsx. It default-exports the screen
as a React component and imports components from '../src'. It may also export
`title` (a string, the page title) and `css` (a string of CSS for the screen's own styles).
The page loads the system's tokens.css then components.css for you.

For this task:
- Read only files inside your design system folder. Don't open any other folder,
  and don't open other run-* folders: other people are building there.
- No external resources, no image files or URLs. The screen is rendered to static
  HTML, so it shows one state; no interaction is needed.
- The screen must work on a 1280px desktop and a 375px phone.
- To check your file, run from the repository root:
  node scripts/preview.mjs eval/<condition>/run-<n>/<name>.tsx
  It says whether the file compiles and writes <name>.html next to it, which you may
  open in headless Chromium. Save any screenshots outside the repository.

When you finish, reply with the file path and nothing else.
```

| | Components only | Framework |
|---|---|---|
| The folder holds | `tokens.css`, `components.css`, `catalogue.md`, `src/` (no `NewPart`) | `tokens.css`, `components.css`, `AGENTS.md`, `rules.md`, `decision-map.md`, `contracts/`, `src/` with `src/templates/` |
| Start line | Start with `catalogue.md`. | Start with `AGENTS.md`, and follow it. |

`node scripts/make-eval.mjs` writes both folders from the system at the root of this repository.
