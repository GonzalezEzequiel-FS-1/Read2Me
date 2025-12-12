import { createTheme } from "@mantine/core";

// Main elegant reading theme
const theme = createTheme({
  // Primary font for body text - elegant serif stack for readability
  fontFamily:
    '"Literata", "Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif',

  // Monospace font for code blocks - modern, readable options
  fontFamilyMonospace:
    '"Berkeley Mono", "IBM Plex Mono", "SF Mono", Consolas, monospace',

  headings: {
    // Font family specifically for headings - distinct from body text
    fontFamily:
      '"Tiempos Headline", "Playfair Display", "Libre Baskerville", Georgia, serif',

    // Default font weight for all headings (overridden per size below)
    fontWeight: "600",

    // Detailed configuration for each heading level
    sizes: {
      h1: {
        fontSize: "2.5rem", // 40px - largest heading
        lineHeight: "1.2", // Tight line height for impact
        fontWeight: "700", // Boldest weight
        letterSpacing: "-0.02em", // Negative spacing for optical balance at large sizes
      },
      h2: {
        fontSize: "2rem", // 32px
        lineHeight: "1.3", // Slightly more relaxed
        fontWeight: "600", // Semi-bold
        letterSpacing: "-0.015em", // Less negative spacing than h1
      },
      h3: {
        fontSize: "1.5rem", // 24px
        lineHeight: "1.4", // More breathing room
        fontWeight: "600",
        letterSpacing: "-0.01em", // Minimal negative spacing
      },
      h4: {
        fontSize: "1.25rem", // 20px
        lineHeight: "1.5", // Standard comfortable reading
        fontWeight: "600",
      },
      h5: {
        fontSize: "1.125rem", // 18px
        lineHeight: "1.5",
        fontWeight: "500", // Medium weight
      },
      h6: {
        fontSize: "1rem", // 16px - base size
        lineHeight: "1.5",
        fontWeight: "500",
      },
    },
  },

  // Custom font size scale - optimized for reading
  fontSizes: {
    xs: "0.8125rem", // 13px - smallest text
    sm: "0.9375rem", // 15px - small labels
    md: "1.0625rem", // 17px - ideal for body text
    lg: "1.1875rem", // 19px - emphasized text
    xl: "1.3125rem", // 21px - large text
  },

  // Line height scale - generous for readability
  lineHeights: {
    xs: "1.5", // Minimum comfortable spacing
    sm: "1.6", // Good for compact text
    md: "1.7", // Optimal for long-form reading
    lg: "1.75", // Very comfortable
    xl: "1.8", // Maximum spacing
  },

  // Primary theme color (used for links, buttons, etc.)
  primaryColor: "blue",

  // Default border radius for components
  defaultRadius: "md",

  // Cursor type for interactive elements
  cursorType: "pointer",

  // Custom color palette for dark mode
  colors: {
    dark: [
      "#C1C2C5", // dark.0 - lightest (for text on dark bg)
      "#A6A7AB", // dark.1
      "#909296", // dark.2
      "#5C5F66", // dark.3
      "#373A40", // dark.4
      "#2C2E33", // dark.5 - medium
      "#25262B", // dark.6
      "#2C2E33", // dark.7
      "#141517", // dark.8
      "#101113", // dark.9 - darkest (for backgrounds)
    ],
  },

  // Keep white as true white for better compatibility
  white: "#F5F5F5",

  // Override default black with warm dark brown
  black: "#242222",

  // Component-specific configurations
  components: {
    Container: {
      defaultProps: {
        // Responsive container widths at different breakpoints
        sizes: {
          xs: 540, // Extra small screens
          sm: 720, // Small screens
          md: 960, // Medium screens
          lg: 1140, // Large screens
          xl: 1320, // Extra large screens
        },
      },
    },

    Card: {
      // Dynamic styles based on color scheme
      styles: (theme) => ({
        root: {
          // Semi-transparent background adapts to theme
          backgroundColor:
            theme.colorScheme === "dark"
              ? "rgba(255, 255, 255, 0.08)" // Light overlay on dark
              : "rgba(216, 204, 186, 0.4)", // Warm tinted overlay on light

          // Smooth transitions for theme switching
          transition: "all 0.2s ease",

          // Subtle border that adapts to theme
          border:
            theme.colorScheme === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)" // Light border on dark
              : "1px solid rgba(107, 95, 83, 0.15)", // Brown border on light
        },
      }),
    },

    ActionIcon: {
      defaultProps: {
        variant: "subtle", // Makes action icons less prominent by default
      },
    },

    Button: {
      styles: (theme) => ({
        root: {
          fontWeight: 500, // Medium weight for button text
          transition: "all 0.2s ease", // Smooth hover/press animations
          letterSpacing: "-0.005em", // Subtle tightening for button text
        },
      }),
    },

    Text: {
      styles: {
        root: {
          letterSpacing: "0.002em", // Tiny positive spacing improves readability
        },
      },
    },

    Title: {
      styles: {
        root: {
          letterSpacing: "-0.015em", // Negative spacing for visual balance in titles
        },
      },
    },
  },

  // Custom theme tokens for specific use cases
  other: {
    reader: {
      // Light mode reading theme - warm, paper-like colors
      light: {
        background: "#E8E0D5", // Warm sepia background
        surface: "#DDD4C7", // Slightly darker surface
        surfaceElevated: "#F0EAE0", // Lighter elevated elements
        text: "#2D2520", // Dark brown text
        textSecondary: "#5C4F45", // Medium brown for secondary text
        border: "rgba(93, 79, 69, 0.25)", // Subtle brown borders
        shadow: "rgba(45, 37, 32, 0.1)", // Soft shadows
        accent: "#7A5D47", // Warm accent color
      },

      // Dark mode reading theme - true dark with high contrast
      dark: {
        background: "#FFFFFF", // Near-black background
        surface: "#2E2F2D", // Slightly lighter surface
        surfaceElevated: "#3A3B39", // Elevated surface
        text: "#F2F2F7", // Off-white text
        textSecondary: "#AEAEB2", // Gray secondary text
        border: "rgba(255, 255, 255, 0.12)", // Subtle light borders
        shadow: "rgba(0, 0, 0, 0.4)", // Deep shadows
        accent: "#B8A491", // Warm beige accent
      },
    },
  },

  // Custom shadow scale - slightly stronger than Mantine defaults
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.15)", // Subtle shadow
    sm: "0 1px 5px rgba(0, 0, 0, 0.18)", // Small shadow
    md: "0 4px 12px rgba(0, 0, 0, 0.22)", // Medium shadow
    lg: "0 8px 24px rgba(0, 0, 0, 0.28)", // Large shadow
    xl: "0 16px 48px rgba(0, 0, 0, 0.35)", // Extra large shadow
  },
});

export { theme };
