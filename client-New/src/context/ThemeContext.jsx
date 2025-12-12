import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState("dark"); // Mantine uses 'light' or 'dark'

  const handleSetColorScheme = () => {
    setColorTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, handleSetColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
