import { Builder } from "./bundle/ui/Builder";
import { ReviewPanel } from "./bundle/ui/ReviewPanel";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-8 px-4 py-8 sm:px-8 xl:flex-row xl:items-start xl:justify-center xl:gap-12 xl:px-8 xl:py-12 2xl:flex-col 2xl:gap-[34px] 2xl:px-[105px]">
        <Builder />
        <ReviewPanel />
      </main>
    </div>
  );
}

export default App;
