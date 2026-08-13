import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BundleProvider } from "./state/BundleContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BundleProvider>
    <App />
  </BundleProvider>,
);
