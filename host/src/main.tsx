import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootEl);
root.render(
  <StrictMode>
    <ClerkProvider
      publishableKey={process.env.VITE_CLERK_PUBLISHABLE_KEY ?? ""}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
