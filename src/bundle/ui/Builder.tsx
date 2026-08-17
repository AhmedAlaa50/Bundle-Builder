import { STEPS } from "../../catalog/steps";
import { AccordionStep } from "./AccordionStep";

export function Builder() {
  return (
    <div className="flex w-full flex-col gap-[13px] lg:max-w-[768px] lg:flex-1">
      {STEPS.map((step) => (
        <AccordionStep key={step.id} step={step} />
      ))}
    </div>
  );
}
