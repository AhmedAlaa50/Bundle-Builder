import { STEPS } from "../../catalog/steps";
import { assetUrl } from "../../catalog/assets";
import { useBundle } from "../context";
import { ProductCard } from "./ProductCard";

export function AccordionStep({
  step,
}: {
  step: (typeof STEPS)[number];
}) {
  const {
    catalog,
    state,
    setStep,
    selectedCountForStep,
  } = useBundle();
  const open = state.openStep === step.id;
  const selectedCount = selectedCountForStep(step.key);
  const products = catalog.products.filter((product) => product.step === step.key);

  return (
    <section
      className={`flex w-full flex-col gap-[5px] ${open ? "rounded-[10px] bg-ice pt-[15px]" : ""}`}
    >
      <p className="px-[15px] text-[10px] font-medium tracking-[1.6px] text-charcoal uppercase sm:text-xs">
        Step {step.id} of 4
      </p>

      <div
        className={`border-ink ${open ? "border-t-[0.5px]" : "border-y-[0.5px]"}`}
      >
        <button
          type="button"
          className="flex w-full items-center gap-[3px] px-[15px] py-5 text-left"
          onClick={() => setStep(step.id)}
          aria-expanded={open}
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="relative size-5 shrink-0 overflow-clip md:size-[26px] 2xl:size-[30px]">
              <img
                alt=""
                src={assetUrl(step.icon)}
                width={30}
                height={30}
                className="size-full object-contain"
              />
            </span>
            <span className="text-lg font-semibold text-heading md:text-[22px] 2xl:text-[28px]">
              {step.label}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <span
              className={`text-sm leading-4 font-medium text-accent ${
                open ? "" : "xl:hidden"
              }`}
            >
              {selectedCount} selected
            </span>
            <span className="relative size-3 overflow-clip">
              <img
                alt=""
                src={assetUrl(open ? "top-arrow.svg" : "down-arrow.svg")}
                width={12}
                height={12}
                className="size-full object-contain"
              />
            </span>
          </span>
        </button>

        {open ? (
          <div className="flex flex-col items-center gap-[15px] px-[15px] pb-5">
            <div className="grid w-full grid-cols-1 gap-[15px] sm:grid-cols-2 2xl:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {step.next ? (
              <button
                type="button"
                onClick={() => {
                  if (step.id < 4) setStep((step.id + 1) as 2 | 3 | 4);
                }}
                className="flex h-[39px] items-center justify-center rounded-[7px] border border-accent px-6 py-[5px] text-lg font-semibold text-accent"
              >
                {step.next}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
