import { z } from "zod";

export const variantSchema = z.object({
  id: z.string(),
  label: z.string(),
  swatch: z.string().optional(),
  seedQty: z.number().int().nonnegative().optional(),
});

export const productSchema = z.object({
  id: z.string(),
  step: z.enum(["cameras", "plan", "sensors", "protection"]),
  reviewCategory: z.enum(["Cameras", "Sensors", "Accessories", "Plan"]),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  learnMoreUrl: z.string().optional(),
  badge: z.string().optional(),
  price: z.number(),
  compareAtPrice: z.number().optional(),
  priceSuffix: z.string().optional(),
  displayFree: z.boolean().optional(),
  seedQty: z.number().int().nonnegative().optional(),
  variants: z.array(variantSchema).default([]),
});

export const catalogSchema = z.object({
  products: z.array(productSchema),
  shipping: z.number(),
  shippingCompareAt: z.number().optional(),
});

export type Catalog = z.infer<typeof catalogSchema>;
export type Product = z.infer<typeof productSchema>;
export type Variant = z.infer<typeof variantSchema>;
