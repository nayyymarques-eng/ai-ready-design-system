# The builder prompt

One AI agent built each screen from a fresh start, with the prompt below. It never saw the harness or the other run. The two runs differ in one line: which folder is the design system, and where to start reading.

```
Build one screen of a web app as a single standalone HTML file.

Product: Tolvane, software for a delivery operations team.
Screen: <name>. <the brief from briefs.md>
Invent realistic content.

Your design system is the folder <folder>, and only that folder. <start line>
Link its stylesheets with relative paths, in this order:
`<link rel="stylesheet" href="../tokens.css">` then `<link rel="stylesheet" href="../components.css">`.
Write the file to <folder>/<run>/<name>.html

For this task:
- Read only files inside that design system folder. Don't open any other folder.
  Don't open other files in its <run>/ folder: other people are building other screens there at the same time.
- Plain HTML and CSS, no external resources. A little vanilla JavaScript is fine if a menu or dialog needs it.
- The screen must work on a 1280px desktop and a 375px phone.
- You may look at your file in headless Chromium to check it. Save any screenshots outside the design system folder.

When you finish, reply with the file path and nothing else.
```

| | Components only | Framework |
|---|---|---|
| The folder holds | `tokens.css`, `components.css`, `catalogue.md` | `tokens.css`, `components.css`, `AGENTS.md`, `rules.md`, `decision-map.md`, `contracts/` |
| Start line | Start with `catalogue.md`. | Start with `AGENTS.md`, and follow it. |

For the three feature screens, the product line adds the feature: "Tolvane is adding a new feature, proof of delivery: when drivers hand over a parcel, they take a photo and collect a signature, and the operations team reviews the proof when a customer disputes a delivery." Their limits also say "no image files or URLs", and the builders could not open the screens built earlier.

After the builds, invented company names that matched real companies were changed in the files, including the product's first name. The scores don't depend on them.
