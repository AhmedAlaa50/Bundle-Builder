import type { BundleState } from "./types";

const KEY = "bundle-builder:v1";

export function loadSavedBundle(): BundleState | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BundleState) : null;
  } catch {
    return null;
  }
}

export function saveBundle(state: BundleState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
