import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BundleProvider } from "./bundle/context.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BundleProvider>
    <App />
  </BundleProvider>,
);
