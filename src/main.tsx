import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n/i18n.ts";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./utils/ThemeContext.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
