import type { Catalog, Product, Variant } from "../catalog/schema";
import { DEFAULT_VARIANT_ID, lineKey } from "./reducer";
import type { BundleState, LineKey } from "./types";

export type ReviewLine = {
  key: LineKey;
  product: Product;
  variant: Variant | null;
  qty: number;
  unitPrice: number;
  unitCompare?: number;
  linePrice: number;
  lineCompare?: number;
};

export function activeVariantIdFor(
  product: Product,
  state: BundleState,
): string {
  if (product.variants.length === 0) return DEFAULT_VARIANT_ID;
  return (
    state.activeVariantId[product.id] ??
    product.variants[0]?.id ??
    DEFAULT_VARIANT_ID
  );
}

export function productHasSelection(
  product: Product,
  state: BundleState,
): boolean {
  const variants =
    product.variants.length > 0
      ? product.variants
      : [{ id: DEFAULT_VARIANT_ID }];
  return variants.some(
    (variant) => (state.quantities[lineKey(product.id, variant.id)] ?? 0) > 0,
  );
}

export function getReviewLines(
  catalog: Catalog,
  state: BundleState,
): ReviewLine[] {
  const lines: ReviewLine[] = [];

  for (const product of catalog.products) {
    const variants: Array<Variant | { id: string; label?: undefined }> =
      product.variants.length > 0
        ? product.variants
        : [{ id: DEFAULT_VARIANT_ID }];

    for (const variant of variants) {
      const qty = state.quantities[lineKey(product.id, variant.id)] ?? 0;
      if (qty <= 0) continue;

      const unitPrice = product.displayFree ? 0 : product.price;
      const unitCompare = product.compareAtPrice;
      lines.push({
        key: lineKey(product.id, variant.id),
        product,
        variant: "label" in variant && variant.label ? (variant as Variant) : null,
        qty,
        unitPrice,
        unitCompare,
        linePrice: unitPrice * qty,
        lineCompare: unitCompare != null ? unitCompare * qty : undefined,
      });
    }
  }

  return lines;
}

export function getTotals(
  catalog: Catalog,
  lines: ReviewLine[],
): { compare: number; sale: number; savings: number } {
  const sale =
    lines.reduce((sum, line) => sum + line.linePrice, 0) + catalog.shipping;
  const compare =
    lines.reduce(
      (sum, line) => sum + (line.lineCompare ?? line.linePrice),
      0,
    ) + catalog.shipping;
  return { compare, sale, savings: Math.max(0, compare - sale) };
}

export function formatMoney(amount: number, suffix = ""): string {
  return `$${amount.toFixed(2)}${suffix}`;
}
