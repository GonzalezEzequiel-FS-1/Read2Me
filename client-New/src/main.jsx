import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="flex flex-col w-full min-h-screen justify-start items-center">
      <MantineProvider theme={{ colorScheme: "light" }}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </div>
  </StrictMode>
);
