import { describe, expect, it } from "vitest";
import { loadCatalog } from "../catalog/loadCatalog";
import { DEFAULT_VARIANT_ID, lineKey } from "./reducer";
import { seedBundleState } from "./seed";
import { getReviewLines, getTotals } from "./selectors";

describe("seeded bundle", () => {
  it("parses the catalog and seeds the design’s initial cart", () => {
    const catalog = loadCatalog();
    const state = seedBundleState(catalog);
    const lines = getReviewLines(catalog, state);
    const totals = getTotals(catalog, lines);

    expect(state.openStep).toBe(1);
    expect(state.quantities[lineKey("cam-v4", "white")]).toBe(1);
    expect(state.quantities[lineKey("cam-pan-v3", "white")]).toBe(2);
    expect(state.quantities[lineKey("sense-motion", DEFAULT_VARIANT_ID)]).toBe(2);
    expect(state.quantities[lineKey("cam-unlimited", DEFAULT_VARIANT_ID)]).toBe(1);
    expect(lines.map((line) => line.product.id)).toEqual([
      "cam-v4",
      "cam-pan-v3",
      "cam-unlimited",
      "sense-motion",
      "sense-hub",
      "microsd-256",
    ]);
    expect(totals.sale).toBeGreaterThan(0);
    expect(totals.compare).toBeGreaterThan(totals.sale);
  });
});
