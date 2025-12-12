import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NavigationProvider } from "./context/NavigationContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import MantineThemeWrapper from "./Components/wrappers/MantineThemeWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <MantineThemeWrapper>
        <BrowserRouter>
          <NavigationProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </NavigationProvider>
        </BrowserRouter>
      </MantineThemeWrapper>
    </ThemeProvider>
  </StrictMode>
);
