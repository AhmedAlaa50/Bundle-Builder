import { STEPS } from "../../catalog/steps";
import { AccordionStep } from "./AccordionStep";

export function Builder() {
  return (
    <div className="flex w-full flex-col gap-[5px] md:gap-[13px] xl:max-w-[768px] xl:flex-1 2xl:max-w-none">
      {STEPS.map((step) => (
        <AccordionStep key={step.id} step={step} />
      ))}
    </div>
  );
}
