# Triage log

Every new part the framework run labelled under CMP-03, as the AI wrote it, and the decision triage took.

## What was labelled

| Labelled as | Screen | Job | Why no component fit |
|---|---|---|---|
| person | drivers, every row | A person in a table row: avatar and name side by side, on one line | A row wraps when a phone squeezes the table, so the name falls under the avatar. No contract keeps an avatar and a name on one line. |
| photo | pod-detail | Shows the photo the driver took at the door, with the time the app stamped on it | No contract shows an image: the system has no image or photo component |
| signature | pod-detail | Shows the signature the recipient drew on the driver's phone | No contract shows a drawn signature: the system has no image component |
| textarea | pod-detail, in the send-back dialog | A message of a few lines that a person types, here what the driver must add to the proof | The field contract covers inputs and selects only, and rules.md lists textarea as not built |
| proof-scenes | pod-queue | Holds the drawings that stand in for the photos and signatures drivers collect | Screens may not load image files, and no contract draws a photo or a signature |
| filter-bar | pod-queue | Keeps the filter on one line and lets it scroll sideways on a phone | The toggle group does not wrap, and four filters with counts are wider than a 375px phone |
| proof-thumb | pod-queue, 12 rows | Shows a small copy of the driver's delivery photo in a table row | No contract shows an image |
| review | pod-queue, in the review dialog | Shows the photo, signature and notes of one delivery inside the review dialog | No contract shows a photo or a signature, and the dialog has no area that scrolls when the screen is short |
| date-picker | pod-rules | Pick the day a sender's new proof rules start | Date picker is listed as not built in rules.md, and the field contract has only input and select |
| file-upload | pod-rules | Add the example photo that drivers see for a sender | File upload is listed as not built in rules.md, and the field contract has only input and select |

## Decisions

Triage grouped the parts by job and took the first decision that fits: replaced by a component that already does the job; becomes a component if it reached triage more than once; waits if it reached triage once. (The fourth decision, updates the component, came later; no part here refines a component.)

| Part | Labelled as | Decision | Next step |
|---|---|---|---|
| Photo and signature | photo, signature, proof-thumb, proof-scenes, review | Becomes a component: Image. Labelled on two screens. | A contract, `contracts/image.md`, with a small size for table rows; styles in `components.css`; the same name in Figma; a check, or "Review only" until one exists. Then pod-queue and pod-detail switch to it. |
| Filter that fits a phone | filter-bar | Waits until it appears again. Labelled on one screen. | The components-only run hit the same limit on drivers and pod-queue, and restyled the toggle group both times, in a style block inside the screen. |
| Text box with several lines | textarea | Waits until it appears again | rules.md lists it as not built. |
| Date picker | date-picker | Waits until it appears again | rules.md lists it as not built. |
| File upload | file-upload | Waits until it appears again | rules.md lists it as not built. |
| Avatar and name on one line | person | Waits until it appears again | |

No part did a job that an existing component already does, so none was replaced. The system in this repository is the one the test ran on: the Image component is decided, not built yet.

## What the components-only run did instead

It labelled nothing, so nothing reached triage. On the three feature screens, the harness found 73 class names outside the system: 43 on pod-detail (among them a map, a breadcrumb, coloured dots and a text box), 26 on pod-queue (among them photo thumbnails, a signature and its own dialog) and 4 on pod-rules (a two-pane layout and a photo). On drivers and pod-queue, it restyled the toggle group in a style block inside the screen.

## Counting

The harness checks each screen as it loads. Two framework parts, textarea and review, sit in dialogs that the page adds from a `<template>` when they open, so the harness doesn't see them and `results.json` doesn't list them. They are in the files and in this log. The case page counts the 7 feature parts the harness sees.
