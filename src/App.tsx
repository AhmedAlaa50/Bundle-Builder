import { Builder } from "./bundle/ui/Builder";
import { ReviewPanel } from "./bundle/ui/ReviewPanel";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-5 pt-[31px] md:gap-8 md:px-8 md:py-8 xl:flex-row xl:items-start xl:justify-center xl:gap-12 xl:px-8 xl:py-12 2xl:flex-col 2xl:gap-[34px] 2xl:px-[105px]">
        <h1 className="mx-auto w-full max-w-[348px] px-[21px] text-center text-[32px] leading-[1.1] font-bold tracking-[-0.064px] text-ink md:max-w-none md:px-0 xl:hidden">
          Let’s get started!
        </h1>
        <div className="flex w-full flex-col gap-0 md:gap-8 xl:contents">
          <Builder />
          <ReviewPanel />
        </div>
      </main>
    </div>
  );
}

export default App;
