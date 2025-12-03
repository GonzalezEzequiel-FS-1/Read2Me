import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppWrapper from "./utils/AppWrapper.tsx"; // Handles theme & dark/light mode
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/ContextProviders/AuthContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AppWrapper>
    </BrowserRouter>
  </StrictMode>
);
