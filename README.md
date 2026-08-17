# Bundle Builder

React + TypeScript + Vite prototype of a multi-step security-system bundle builder, implemented from the take-home Figma.

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

- Desktop layout follows Figma Frame 1735 (accordion + review column). Smaller viewports stack the review panel under the builder.
- Gilroy isn’t a licensed webfont here, so the UI uses the system sans already tokenized in `src/index.css`.
- Camera card prices come from the product cards; the review panel in Figma uses a few different line totals for Pan v3. This app always computes `qty × unit price`.
