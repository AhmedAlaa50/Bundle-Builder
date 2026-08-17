import type { Product } from "./schema";

export const STEPS: {
  id: 1 | 2 | 3 | 4;
  key: Product["step"];
  label: string;
  next: string | null;
  icon: string;
}[] = [
  {
    id: 1,
    key: "cameras",
    label: "Choose your cameras",
    next: "Next: Choose your plan",
    icon: "camera-icon.svg",
  },
  {
    id: 2,
    key: "plan",
    label: "Choose your plan",
    next: "Next: Choose your sensors",
    icon: "plan-icon.svg",
  },
  {
    id: 3,
    key: "sensors",
    label: "Choose your sensors",
    next: "Next: Add extra protection",
    icon: "sensor-icon.svg",
  },
  {
    id: 4,
    key: "protection",
    label: "Add extra protection",
    next: null,
    icon: "protection-icon.svg",
  },
];

export const REVIEW_CATEGORIES: Product["reviewCategory"][] = [
  "Cameras",
  "Sensors",
  "Accessories",
  "Plan",
];
