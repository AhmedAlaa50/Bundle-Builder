/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { loadCatalog } from "../catalog/loadCatalog";
import type { Catalog, Product } from "../catalog/schema";
import {
  DEFAULT_VARIANT_ID,
  bundleReducer,
  lineKey,
} from "./reducer";
import { loadSavedBundle, saveBundle } from "./persistence";
import { seedBundleState } from "./seed";
import {
  activeVariantIdFor,
  getReviewLines,
  getTotals,
  productHasSelection,
  type ReviewLine,
} from "./selectors";
import type { BundleAction, BundleState } from "./types";

type BundleContextValue = {
  catalog: Catalog;
  state: BundleState;
  dispatch: React.Dispatch<BundleAction>;
  getQty: (productId: string, variantId?: string) => number;
  setQty: (productId: string, variantId: string, qty: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  selectedCountForStep: (step: Product["step"]) => number;
  activeVariantId: (product: Product) => string;
  isProductSelected: (product: Product) => boolean;
  lines: ReviewLine[];
  totals: { compare: number; sale: number; savings: number };
  saveForLater: () => void;
};

const BundleContext = createContext<BundleContextValue | null>(null);

export function BundleProvider({ children }: { children: ReactNode }) {
  const catalog = useMemo(() => loadCatalog(), []);
  const [state, dispatch] = useReducer(
    bundleReducer,
    undefined,
    () => loadSavedBundle() ?? seedBundleState(catalog),
  );

  const getQty = useCallback(
    (productId: string, variantId?: string) => {
      const product = catalog.products.find((item) => item.id === productId);
      const id =
        variantId ??
        (product ? activeVariantIdFor(product, state) : DEFAULT_VARIANT_ID);
      return state.quantities[lineKey(productId, id)] ?? 0;
    },
    [catalog.products, state],
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

  const setStep = useCallback((step: 1 | 2 | 3 | 4) => {
    dispatch({ type: "SET_STEP", step });
  }, []);

  const selectedCountForStep = useCallback(
    (step: Product["step"]) => {
      return catalog.products.filter(
        (product) =>
          product.step === step && productHasSelection(product, state),
      ).length;
    },
    [catalog.products, state],
  );

  const activeVariantId = useCallback(
    (product: Product) => activeVariantIdFor(product, state),
    [state],
  );

  const isProductSelected = useCallback(
    (product: Product) => productHasSelection(product, state),
    [state],
  );

  const lines = useMemo(
    () => getReviewLines(catalog, state),
    [catalog, state],
  );
  const totals = useMemo(() => getTotals(catalog, lines), [catalog, lines]);

  const saveForLater = useCallback(() => {
    saveBundle(state);
  }, [state]);

  const value = useMemo(
    () => ({
      catalog,
      state,
      dispatch,
      getQty,
      setQty,
      setActiveVariant,
      setStep,
      selectedCountForStep,
      activeVariantId,
      isProductSelected,
      lines,
      totals,
      saveForLater,
    }),
    [
      catalog,
      state,
      getQty,
      setQty,
      setActiveVariant,
      setStep,
      selectedCountForStep,
      activeVariantId,
      isProductSelected,
      lines,
      totals,
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
