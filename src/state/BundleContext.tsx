import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { loadCatalog } from "../catalog/loadCatalog";
import {
  DEFAULT_VARIANT_ID,
  bundleReducer,
  initialBundleState,
  lineKey,
} from "./bundleReducer";
import { loadSavedBundle, saveBundle } from "./persistence";
import type { BundleAction, BundleState } from "./types";
import type { Product } from "../catalog/schema";

type BundleContextValue = {
  state: BundleState;
  dispatch: React.Dispatch<BundleAction>;
  getQty: (productId: string, variantId?: string) => number;
  setQty: (productId: string, variantId: string, qty: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  selectedCountForStep: (step: Product["step"]) => number;
  saveForLater: () => void;
};

const BundleContext = createContext<BundleContextValue | null>(null);

function getInitialState(): BundleState {
  return loadSavedBundle() ?? initialBundleState;
}

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    bundleReducer,
    undefined,
    getInitialState,
  );
  const catalog = useMemo(() => loadCatalog(), []);

  const getQty = useCallback(
    (productId: string, variantId?: string) => {
      const id =
        variantId ?? state.activeVariantId[productId] ?? DEFAULT_VARIANT_ID;
      return state.quantities[lineKey(productId, id)] ?? 0;
    },
    [state.activeVariantId, state.quantities],
  );

  const setQty = useCallback(
    (productId: string, variantId: string, qty: number) => {
      dispatch({ type: "SET_QTY", productId, variantId, qty });
    },
    [],
  );

  const setActiveVariant = useCallback(
    (productId: string, variantId: string) => {
      dispatch({ type: "SET_ACTIVE_VARIANT", productId, variantId });
    },
    [],
  );

  const selectedCountForStep = useCallback(
    (step: Product["step"]) => {
      return catalog.products.filter((product) => {
        if (product.step !== step) return false;
        const variants =
          product.variants.length > 0
            ? product.variants
            : [{ id: DEFAULT_VARIANT_ID }];
        return variants.some(
          (variant) =>
            (state.quantities[lineKey(product.id, variant.id)] ?? 0) > 0,
        );
      }).length;
    },
    [catalog.products, state.quantities],
  );

  const saveForLater = useCallback(() => {
    saveBundle(state);
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      getQty,
      setQty,
      setActiveVariant,
      selectedCountForStep,
      saveForLater,
    }),
    [
      state,
      getQty,
      setQty,
      setActiveVariant,
      selectedCountForStep,
      saveForLater,
    ],
  );

  return (
    <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
  );
}

export function useBundle() {
  const ctx = useContext(BundleContext);
  if (!ctx) {
    throw new Error("useBundle must be used inside BundleProvider");
  }
  return ctx;
}
