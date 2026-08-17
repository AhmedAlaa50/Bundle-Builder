import type { Product } from "../../catalog/schema";
import { assetUrl } from "../../catalog/assets";
import { useBundle } from "../context";

export function VariantPicker({ product }: { product: Product }) {
  const { activeVariantId, setActiveVariant } = useBundle();
  if (product.variants.length === 0) return null;

  const active = activeVariantId(product);

  return (
    <div className="flex flex-wrap gap-1.5">
      {product.variants.map((variant) => {
        const selected = variant.id === active;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => setActiveVariant(product.id, variant.id)}
            className={`flex h-[26px] w-[65px] items-center justify-center gap-0.5 rounded-[2px] border-[0.5px] ${
              selected
                ? "border-success bg-mint-tint"
                : "border-[#ccc] bg-white"
            }`}
          >
            {variant.swatch ? (
              <span className="relative size-[22px] shrink-0 overflow-clip">
                <img
                  alt=""
                  src={assetUrl(variant.swatch)}
                  width={22}
                  height={22}
                  className="size-full object-cover"
                />
              </span>
            ) : null}
            <span className="text-[10px] tracking-[0.6px] text-ink">
              {variant.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
