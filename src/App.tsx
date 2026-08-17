import { Builder } from "./bundle/ui/Builder";
import { ReviewPanel } from "./bundle/ui/ReviewPanel";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-8 px-4 py-8 sm:px-8 lg:flex-row lg:items-start lg:justify-center lg:gap-12 lg:px-[105px] lg:py-12">
        <Builder />
        <ReviewPanel />
      </main>
    </div>
  );
}

export default App;
