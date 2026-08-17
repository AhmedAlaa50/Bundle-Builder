import { assetUrl } from "../../catalog/assets";

type QuantityStepperProps = {
  value: number;
  onChange: (qty: number) => void;
  size?: "card" | "review";
};

export function QuantityStepper({
  value,
  onChange,
  size = "card",
}: QuantityStepperProps) {
  const compact = size === "review";

  return (
    <div
      className={`flex items-center ${compact ? "w-[72px] justify-between py-1" : "w-20 justify-center gap-2.5 py-1"}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 0}
        onClick={() => onChange(value - 1)}
        className={`flex size-5 shrink-0 items-center justify-center overflow-clip rounded-[4px] disabled:cursor-not-allowed ${
          value <= 0
            ? "border-2 border-border bg-white"
            : "border-2 border-fog bg-fog"
        }`}
      >
        <span className="relative block size-2 overflow-clip">
          <img
            alt=""
            src={assetUrl("minus.svg")}
            width={8}
            height={8}
            className="size-full object-contain"
          />
        </span>
      </button>
      <span
        className={`font-medium text-heading ${compact ? "text-[14px] leading-4" : "text-base leading-5"}`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="flex size-5 shrink-0 items-center justify-center overflow-clip rounded-[4px] bg-fog"
      >
        <span className="relative block size-2 overflow-clip">
          <img
            alt=""
            src={assetUrl("add.svg")}
            width={8}
            height={8}
            className="size-full object-contain"
          />
        </span>
      </button>
    </div>
  );
}
