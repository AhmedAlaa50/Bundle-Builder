import { assetUrl } from "../../catalog/assets";
import type { Product } from "../../catalog/schema";
import { useBundle } from "../context";
import { formatMoney } from "../selectors";
import { QuantityStepper } from "./QuantityStepper";
import { VariantPicker } from "./VariantPicker";

export function ProductCard({ product }: { product: Product }) {
  const { getQty, setQty, activeVariantId, isProductSelected } = useBundle();
  const variantId = activeVariantId(product);
  const qty = getQty(product.id, variantId);
  const selected = isProductSelected(product);
  const suffix = product.priceSuffix ?? "";

  return (
    <article
      className={`flex h-full gap-[19px] overflow-clip rounded-[10px] bg-white p-[11px] 2xl:flex-col 2xl:gap-[19px] 2xl:px-[11px] 2xl:py-[15px] ${
        selected
          ? "border-2 border-accent/70"
          : "border border-transparent"
      }`}
    >
      <div className="relative h-[137px] w-[101px] shrink-0 overflow-clip rounded-[5px] bg-white 2xl:aspect-[214/124] 2xl:h-auto 2xl:w-full">
        <img
          alt=""
          src={assetUrl(product.image)}
          width={214}
          height={137}
          className="size-full object-contain"
        />
        {product.badge ? (
          <span className="absolute top-0 left-0 rounded-[10px] bg-accent px-1.5 py-0.5 text-center text-xs font-semibold text-white">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-col gap-2 tracking-[0.6px]">
          <h3 className="text-base font-semibold text-ink 2xl:text-lg">
            {product.title}
          </h3>
          <p className="text-xs leading-[1.3] text-ink/75 2xl:text-sm">
            {product.description}{" "}
            {product.learnMoreUrl ? (
              <a
                href={product.learnMoreUrl}
                className="text-link underline"
                onClick={(event) => event.stopPropagation()}
              >
                Learn More
              </a>
            ) : null}
          </p>
        </div>

        <VariantPicker product={product} />

        <div className="mt-auto flex items-end justify-between gap-2.5">
          <QuantityStepper
            value={qty}
            onChange={(next) => setQty(product.id, variantId, next)}
          />
          <div className="flex min-w-0 flex-1 flex-col items-end justify-center gap-[3px] text-right text-base tracking-[0.6px] 2xl:flex-row 2xl:items-center 2xl:justify-end">
            {product.displayFree ? (
              <p className="font-semibold text-accent">FREE</p>
            ) : (
              <>
                {product.compareAtPrice != null ? (
                  <p className="text-danger line-through">
                    {formatMoney(product.compareAtPrice, suffix)}
                  </p>
                ) : null}
                <p className="text-steel">{formatMoney(product.price, suffix)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
