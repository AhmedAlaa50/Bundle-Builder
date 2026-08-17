import type { Catalog } from "../catalog/schema";
import { DEFAULT_VARIANT_ID, lineKey } from "./reducer";
import type { BundleState, LineKey } from "./types";

export function seedBundleState(catalog: Catalog): BundleState {
  const quantities: Record<LineKey, number> = {};
  const activeVariantId: Record<string, string | null> = {};

  for (const product of catalog.products) {
    if (product.variants.length > 0) {
      const seeded = product.variants.find((variant) => (variant.seedQty ?? 0) > 0);
      activeVariantId[product.id] = seeded?.id ?? product.variants[0].id;
      for (const variant of product.variants) {
        if (variant.seedQty && variant.seedQty > 0) {
          quantities[lineKey(product.id, variant.id)] = variant.seedQty;
        }
      }
    } else if (product.seedQty && product.seedQty > 0) {
      quantities[lineKey(product.id, DEFAULT_VARIANT_ID)] = product.seedQty;
    }
  }

  return { quantities, activeVariantId, openStep: 1 };
}
