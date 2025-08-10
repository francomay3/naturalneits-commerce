import { createTheme, MantineThemeOverride } from "@mantine/core";
import { Gilda_Display, Karla } from "next/font/google";

// Initialize Google Fonts
const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-texts",
  style: ["normal"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

const gildaDisplay = Gilda_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-titles",
  weight: "400",
});

const themeOverride: MantineThemeOverride = {
  autoContrast: true,
  colors: {
    brand: [
      "#ffefea",
      "#f8ded8",
      "#e9bcb2",
      "#dc9788",
      "#d07864",
      "#c9654e",
      "#c05239",
      "#b04a33",
      "#9e412c",
      "#8b3523",
    ],
    secondary: [
      "#eaf8fb",
      "#e1eaec",
      "#c7d2d3",
      "#aab8bb",
      "#91a2a5",
      "#819598",
      "#778e93",
      "#60777b",
      "#556e72",
      "#426065",
    ],
    neutral: [
      "#fdf6ea",
      "#f5ebdb",
      "#e8d4b4",
      "#dcbc8a",
      "#d1a867",
      "#cb9b50",
      "#c89443",
      "#b18134",
      "#9e722c",
      "#896220",
    ],
  },
  components: {
    Carousel: {
      defaultProps: {
        controlSize: 44,
        emblaOptions: {
          loop: true,
          dragFree: false,
          align: "center",
        },
        styles: {
          root: {
            borderRadius: "var(--mantine-radius-default)",
            overflow: "hidden",
          },
          indicator: {
            border: "1px solid var(--mantine-color-brand-filled)",
          },
          control: {
            border: "none",
            backgroundColor: "var(--mantine-color-brand-filled)",
            opacity: 1,
            color: "var(--mantine-color-white)",
          },
        },
      },
    },
    Button: {
      defaultProps: {
        h: 44,
      },
    },
    Text: {
      defaultProps: {
        fz: 16,
        fw: 400,
        lh: 1.5,
        pb: 10,
      },
    },
    Title: {
      defaultProps: {
        c: "var(--mantine-primary-color-filled)",
      },
    },
    Tooltip: {
      defaultProps: {
        closeDelay: 100,
        color: "var(--mantine-color-brand-filled)",
        openDelay: 500,
      },
    },
    ActionIcon: {
      defaultProps: {
        w: 44,
        h: 44,
      },
    },
  },
  cursorType: "pointer",
  defaultRadius: "3px",
  fontFamily: karla.style.fontFamily,
  headings: {
    fontFamily: gildaDisplay.style.fontFamily,
    fontWeight: "400",
    sizes: {
      h1: { fontSize: "43px" },
      h2: { fontSize: "34px" },
      h3: { fontSize: "30px" },
      h4: { fontSize: "26px" },
      h5: { fontSize: "21px" },
      h6: { fontSize: "17px" },
    },
  },
  primaryColor: "brand",
  black: "#55402b",
  white: "#fbf6ef",
};

const theme = createTheme(themeOverride);

export default theme;
