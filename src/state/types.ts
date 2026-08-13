export type LineKey = `${string}::${string}`; // productId::variantId

export type BundleState = {
  quantities: Record<LineKey, number>;
  activeVariantId: Record<string, string | null>; // per product
  openStep: 1 | 2 | 3 | 4;
};

export type BundleAction =
  | { type: "SET_QTY"; productId: string; variantId: string; qty: number }
  | { type: "SET_ACTIVE_VARIANT"; productId: string; variantId: string }
  | { type: "SET_STEP"; step: 1 | 2 | 3 | 4 }
  | { type: "HYDRATE"; state: BundleState };
