# Bundle Builder

React + TypeScript + Vite prototype of a multi-step security-system bundle builder, implemented from the take-home Figma.

Live: [https://bundle-builder-umber.vercel.app/](https://bundle-builder-umber.vercel.app/)

## Run

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build
npm run preview  # serve the build
npm test         # vitest
```

## How it works

- **Catalog-driven UI.** Products, prices, badges, variants, and the seeded cart live in `src/catalog/catalog.json`. Cards and the review panel render from that data, not per-product markup.
- **Feature folder.** Cart state and screens live together under `src/bundle/` (`reducer`, `context`, `ui/`). The catalog stays a data package and does not know about quantities.
- **Variant quantities.** Color chips switch the active variant; the card stepper edits that variant only. Every variant with qty &gt; 0 appears as its own review line.
- **Live review.** Steppers on cards and in the review panel stay in sync. Totals, savings, and the “N selected” counts recompute as quantities change.
- **Save my system for later.** Writes the current bundle to `localStorage` and restores it on the next visit.

Checkout is a prototype confirmation only.

## Notes

- **Layouts.** Below `md` it uses Figma **iPhone 13 & 14 - 35**: “Let’s get started!” heading, compact accordion with selected counts on every step, and a full-bleed review panel underneath. From `md` to `xl` the page stays stacked with more padding. From `xl` (1280px) it uses Frame 1735: accordion + review side by side, horizontal product cards. From `2xl` (1536px) it uses Frame 1736: full-width 5-up vertical cards and a two-column review panel underneath.
- Gilroy isn’t a licensed webfont here, so the UI uses the system sans already tokenized in `src/index.css`.
- Camera card prices come from the product cards; the review panel in Figma uses a few different line totals for Pan v3. This app always computes `qty × unit price`.

## Decisions

- **Same product, different colors.** Each selected color is its own review line, with quantity tracked per variant rather than rolled into one product. When two or more colors of the same product are in the bundle, the line title appends the color (`Cam v4 · White`) so the rows stay distinguishable; a single selected color keeps the product title only.
- **Mobile accordion arrows (iPhone 13 & 14 - 35).** The collapse/expand chevrons in that Figma frame do not look correct. This app implements the expected accordion behavior: a down arrow when a step is collapsed and an up arrow when it is open.

## Future Enhancements

- **Quantity stepper alignment.** On product cards and in the review panel the stepper sits with the rest of the content, so it floats at different heights depending on titles, badges, variant chips, and line-item copy. Align steppers so they share a consistent baseline regardless of content length.
