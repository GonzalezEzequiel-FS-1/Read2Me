import { MantineProvider, createTheme } from "@mantine/core";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { theme } from "../../assets/AppTheme/theme";

const MantineThemeWrapper = ({ children }) => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <MantineProvider theme={theme} forceColorScheme={colorTheme}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,300;0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,300;1,7..72,400;1,7..72,500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
          
          body {
            background-color: ${
              colorTheme === "light" ? "#f8f8f8" : "#202230"
            } !important;
            color: ${colorTheme === "light" ? "#3e3936" : "#F2F2F7"} !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
          }
        `}
      </style>
      {children}
    </MantineProvider>
  );
};

export default MantineThemeWrapper;
