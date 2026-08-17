import type { BundleAction, BundleState, LineKey } from "./types";

/** Products with no color options use this as their only variant id. */
export const DEFAULT_VARIANT_ID = "default";

export function lineKey(productId: string, variantId: string): LineKey {
  return `${productId}::${variantId}`;
}

export const initialBundleState: BundleState = {
  quantities: {},
  activeVariantId: {},
  openStep: 1,
};

export function bundleReducer(
  state: BundleState,
  action: BundleAction,
): BundleState {
  switch (action.type) {
    case "SET_QTY": {
      const key = lineKey(action.productId, action.variantId);
      const qty = Math.max(0, action.qty);
      const quantities = { ...state.quantities };

      if (qty === 0) {
        delete quantities[key];
      } else {
        quantities[key] = qty;
      }

      return { ...state, quantities };
    }

    case "SET_ACTIVE_VARIANT":
      return {
        ...state,
        activeVariantId: {
          ...state.activeVariantId,
          [action.productId]: action.variantId,
        },
      };

    case "SET_STEP":
      return { ...state, openStep: action.step };

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}
