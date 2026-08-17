import { useState } from "react";
import { assetUrl } from "../../catalog/assets";
import { REVIEW_CATEGORIES } from "../../catalog/steps";
import { DEFAULT_VARIANT_ID } from "../reducer";
import { useBundle } from "../context";
import { formatMoney, type ReviewLine } from "../selectors";
import { QuantityStepper } from "./QuantityStepper";

function lineTitle(line: ReviewLine, lines: ReviewLine[]): string {
  const variantLines = lines.filter((item) => item.product.id === line.product.id);
  if (variantLines.length > 1 && line.variant) {
    return `${line.product.title} · ${line.variant.label}`;
  }
  return line.product.title;
}

function Price({ line }: { line: ReviewLine }) {
  const suffix = line.product.priceSuffix ?? "";
  const compare =
    line.product.displayFree
      ? line.lineCompare
      : line.lineCompare != null && line.lineCompare !== line.linePrice
        ? line.lineCompare
        : undefined;

  return (
    <div className="flex shrink-0 flex-col items-end text-right text-sm tracking-[0.07px] 2xl:flex-row 2xl:items-center 2xl:gap-2.5 2xl:text-base 2xl:tracking-[0.08px]">
      {compare != null ? (
        <p className="font-medium text-gray-c-600 line-through">
          {formatMoney(compare, suffix)}
        </p>
      ) : null}
      <p className="font-semibold text-accent">
        {line.product.displayFree ? "FREE" : formatMoney(line.linePrice, suffix)}
      </p>
    </div>
  );
}

function ReviewItem({
  line,
  lines,
}: {
  line: ReviewLine;
  lines: ReviewLine[];
}) {
  const { setQty } = useBundle();
  const variantId = line.variant?.id ?? DEFAULT_VARIANT_ID;
  const showStepper = line.product.step !== "plan";

  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative size-[41px] shrink-0 overflow-clip rounded-[5px] bg-white">
          <img
            alt=""
            src={assetUrl(line.product.image)}
            width={41}
            height={41}
            className="size-full object-contain"
          />
        </div>
        <p className="min-w-0 flex-1 text-sm font-medium tracking-[0.07px] text-heading 2xl:text-lg 2xl:tracking-[0.09px]">
          {lineTitle(line, lines)}
        </p>
        {showStepper ? (
          <QuantityStepper
            size="review"
            value={line.qty}
            onChange={(qty) => setQty(line.product.id, variantId, qty)}
          />
        ) : null}
      </div>
      <Price line={line} />
    </div>
  );
}

export function ReviewPanel() {
  const { catalog, lines, totals, saveForLater } = useBundle();
  const [saved, setSaved] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const monthly = totals.sale * (19.19 / 187.89);

  return (
    <aside className="flex w-full flex-col gap-[5px] rounded-[10px] bg-ice pt-[15px] xl:w-[399px] xl:shrink-0 2xl:w-full">
      <p className="px-[15px] text-xs font-medium tracking-[1.6px] text-charcoal uppercase 2xl:hidden">
        Review
      </p>

      <div className="flex flex-col gap-2.5 px-5 pt-5 pb-8 2xl:flex-row 2xl:items-start 2xl:justify-center 2xl:gap-[52px]">
        <div className="flex min-w-0 w-full flex-col gap-2.5 2xl:max-w-[552px] 2xl:flex-1">
          <div className="flex flex-col gap-[5px] tracking-[0.6px]">
            <h2 className="text-[22px] font-semibold text-ink 2xl:text-[28px]">
              Your security system
            </h2>
            <p className="text-sm leading-[1.3] text-ink/75 2xl:text-base">
              Review your personalized protection system designed to keep what
              matters most safe.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {REVIEW_CATEGORIES.map((category) => {
              const group = lines.filter(
                (line) => line.product.reviewCategory === category,
              );
              if (group.length === 0) return null;
              return (
                <section
                  key={category}
                  className="flex flex-col gap-2 border-t border-line pt-[15px]"
                >
                  <h3 className="text-xs tracking-[0.36px] text-gray-c-500 uppercase">
                    {category}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {group.map((line) => (
                      <ReviewItem key={line.key} line={line} lines={lines} />
                    ))}
                  </div>
                </section>
              );
            })}

            <section className="flex flex-col border-t border-line pt-[15px]">
              <div className="flex w-full items-center gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="relative size-[41px] shrink-0 overflow-clip rounded-[5px] bg-white">
                    <img
                      alt=""
                      src={assetUrl("shipping.svg")}
                      width={41}
                      height={41}
                      className="size-full object-contain"
                    />
                  </div>
                  <p className="min-w-0 flex-1 text-sm font-medium tracking-[0.07px] text-heading 2xl:text-lg 2xl:tracking-[0.09px]">
                    Fast Shipping
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end text-right text-sm 2xl:flex-row 2xl:items-center 2xl:gap-2.5 2xl:text-base">
                  {catalog.shippingCompareAt != null ? (
                    <p className="font-medium text-gray-c-600 line-through">
                      {formatMoney(catalog.shippingCompareAt)}
                    </p>
                  ) : null}
                  <p className="font-semibold text-accent">
                    {catalog.shipping === 0
                      ? "FREE"
                      : formatMoney(catalog.shipping)}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 pt-2 2xl:w-[486px] 2xl:shrink-0 2xl:gap-2 2xl:pt-0">
          <div className="flex items-start justify-between gap-3 2xl:flex-col 2xl:gap-4">
            <div className="flex min-w-0 items-center gap-3 2xl:w-full 2xl:gap-[25px]">
              <div className="relative size-[78px] shrink-0 overflow-clip 2xl:size-[131px]">
                <img
                  alt="100% Wyze Satisfaction Guaranteed"
                  src={assetUrl("satisfaction.svg")}
                  width={131}
                  height={131}
                  className="size-full object-cover"
                />
              </div>
              <div className="hidden min-w-0 text-lg leading-[1.1] tracking-[0.6px] text-ink 2xl:block">
                <p className="font-semibold">30-day hassle-free returns</p>
                <p>
                  If you&apos;re not totally in love with the product, we will
                  refund you 100%.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 2xl:w-full 2xl:flex-row 2xl:items-center 2xl:justify-between">
              <span className="rounded-[3px] bg-accent px-2 py-[5px] text-xs tracking-[-0.6px] text-white 2xl:p-2 2xl:text-base 2xl:tracking-[-0.8px]">
                as low as {formatMoney(monthly)}/mo
              </span>
              <div className="flex items-baseline justify-end gap-2">
                {totals.compare > totals.sale ? (
                  <p className="text-lg font-medium tracking-[0.045px] text-gray-c-600 line-through 2xl:text-[22px] 2xl:tracking-[0.055px]">
                    {formatMoney(totals.compare)}
                  </p>
                ) : null}
                <p className="text-2xl font-bold tracking-[-0.03px] text-accent 2xl:text-[28px] 2xl:leading-8 2xl:tracking-[-0.035px]">
                  {formatMoney(totals.sale)}
                </p>
              </div>
            </div>
          </div>

          {totals.savings > 0 ? (
            <p className="w-full text-center text-xs font-semibold tracking-[-0.056px] text-success 2xl:pt-2.5 2xl:text-sm">
              Congrats! You’re saving {formatMoney(totals.savings)} on your
              security bundle!
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => setCheckedOut(true)}
            className="mt-1 w-full rounded-[4px] bg-accent px-4 py-[13px] text-center text-[22px] font-semibold text-white 2xl:mt-0 2xl:text-[17px]"
          >
            Checkout
          </button>
          {checkedOut ? (
            <p className="text-center text-sm text-ink">
              Thanks — this prototype has no payment flow.
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => {
              saveForLater();
              setSaved(true);
            }}
            className="w-full text-center text-sm text-charcoal italic underline"
          >
            Save my system for later
          </button>
          {saved ? (
            <p className="text-center text-xs text-success">
              Saved in this browser. It will restore on your next visit.
            </p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
