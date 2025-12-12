import { MantineProvider, createTheme } from "@mantine/core";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const theme = createTheme({
  fontFamily:
    '"Literata", "Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif',
  fontFamilyMonospace:
    '"Berkeley Mono", "IBM Plex Mono", "SF Mono", Consolas, monospace',
  headings: {
    fontFamily:
      '"Tiempos Headline", "Playfair Display", "Libre Baskerville", Georgia, serif',
    fontWeight: "600",
    sizes: {
      h1: {
        fontSize: "2.5rem",
        lineHeight: "1.2",
        fontWeight: "700",
        letterSpacing: "-0.02em",
      },
      h2: {
        fontSize: "2rem",
        lineHeight: "1.3",
        fontWeight: "600",
        letterSpacing: "-0.015em",
      },
      h3: {
        fontSize: "1.5rem",
        lineHeight: "1.4",
        fontWeight: "600",
        letterSpacing: "-0.01em",
      },
      h4: { fontSize: "1.25rem", lineHeight: "1.5", fontWeight: "600" },
      h5: { fontSize: "1.125rem", lineHeight: "1.5", fontWeight: "500" },
      h6: { fontSize: "1rem", lineHeight: "1.5", fontWeight: "500" },
    },
  },
  fontSizes: {
    xs: "0.8125rem", // 13px - slightly larger for readability
    sm: "0.9375rem", // 15px
    md: "1.0625rem", // 17px - optimal for long-form reading
    lg: "1.1875rem", // 19px
    xl: "1.3125rem", // 21px
  },
  lineHeights: {
    xs: "1.5",
    sm: "1.6",
    md: "1.7", // Generous for comfortable reading
    lg: "1.75",
    xl: "1.8",
  },
  primaryColor: "blue",
  defaultRadius: "md",
  cursorType: "pointer",

  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5C5F66",
      "#373A40",
      "#2C2E33",
      "#25262B",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },

  white: "#E8E0D5", // Richer, darker sepia
  black: "#232422",

  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
    Card: {
      styles: (theme) => ({
        root: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(216, 204, 186, 0.4)",
          transition: "all 0.2s ease",
          border:
            theme.colorScheme === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(107, 95, 83, 0.15)",
        },
      }),
    },
    ActionIcon: {
      defaultProps: {
        variant: "subtle",
      },
    },
    Button: {
      styles: (theme) => ({
        root: {
          fontWeight: 500,
          transition: "all 0.2s ease",
          letterSpacing: "-0.005em",
        },
      }),
    },
    Text: {
      styles: {
        root: {
          letterSpacing: "0.002em", // Very subtle for readability
        },
      },
    },
    Title: {
      styles: {
        root: {
          letterSpacing: "-0.015em",
        },
      },
    },
  },

  other: {
    reader: {
      light: {
        background: "#E8E0D5", // Richer, warmer sepia
        surface: "#DDD4C7", // Darker cream
        surfaceElevated: "#F0EAE0", // Elevated cream
        text: "#2D2520", // Darker, richer brown
        textSecondary: "#5C4F45", // Medium brown
        border: "rgba(93, 79, 69, 0.25)",
        shadow: "rgba(45, 37, 32, 0.1)",
        accent: "#7A5D47", // Warm brown accent
      },
      dark: {
        background: "#232422",
        surface: "#2E2F2D",
        surfaceElevated: "#3A3B39",
        text: "#F2F2F7",
        textSecondary: "#AEAEB2",
        border: "rgba(255, 255, 255, 0.12)",
        shadow: "rgba(0, 0, 0, 0.4)",
        accent: "#B8A491",
      },
    },
  },

  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.15)",
    sm: "0 1px 5px rgba(0, 0, 0, 0.18)",
    md: "0 4px 12px rgba(0, 0, 0, 0.22)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.28)",
    xl: "0 16px 48px rgba(0, 0, 0, 0.35)",
  },
});

const MantineThemeWrapper = ({ children }) => {
  const { colorTheme } = useContext(ThemeContext);

  return (
    <MantineProvider theme={theme} forceColorScheme={colorTheme}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,300;0,7..72,400;0,7..72,500;0,7..72,600;0,7..72,700;1,7..72,300;1,7..72,400;1,7..72,500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
          
          body {
            background-color: ${
              colorTheme === "light" ? "#E8E0D5" : "#232422"
            } !important;
            color: ${colorTheme === "light" ? "#2D2520" : "#F2F2F7"} !important;
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
