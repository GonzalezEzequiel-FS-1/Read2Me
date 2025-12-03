import { useState, useMemo, type ReactNode } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // light or dark
          background: {
            default: mode === "light" ? "#f0f0f0" : "#121212",
          },
          text: {
            primary: mode === "light" ? "#1a1a1a" : "#ffffff",
            secondary: mode === "light" ? "#555555" : "#aaaaaa",
          },
        },
      }),
    [mode]
  );

  // const toggleMode = () =>
  //   setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
