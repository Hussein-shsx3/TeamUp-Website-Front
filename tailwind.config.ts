import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        primary: ["var(--font-inter)", "sans-serif"],
        secondary: ["var(--font-josefin-sans)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        sbackground: "var(--sbackground)",
        primary: {
          DEFAULT: "#2563EB",
          dark: "#1E40AF",
          light: "#DBEAFE",
          lightbg: "#3B82F6",
        },
        accent: {
          DEFAULT: "#34D399",
          dark: "#10B981",
          light: "#D1FAE5",
        },
        content: {
          DEFAULT: "#000000",
          muted: "#BFC6CC",
          inverse: "#FFFFFF",
          light: "#475569",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#1D3557",
        },
      },
      fontSize: {
        // Desktop
        h1: ["3.5rem", { lineHeight: "1.2" }],
        h2: ["2.5rem", { lineHeight: "1.25" }],
        h3: ["1.8rem", { lineHeight: "1.3" }],
        h4: ["1.5rem", { lineHeight: "1.35" }],
        h5: ["1.25rem", { lineHeight: "1.4" }],
        h6: ["1rem", { lineHeight: "1.5" }],
        // Mobile
        "h1-mobile": ["2.3rem", { lineHeight: "1.2" }],
        "h2-mobile": ["2rem", { lineHeight: "1.25" }],
        "h3-mobile": ["1.5rem", { lineHeight: "1.3" }],
        "h4-mobile": ["1.25rem", { lineHeight: "1.35" }],
        "h5-mobile": ["1.125rem", { lineHeight: "1.4" }],
        "h6-mobile": ["1rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
  // Safelist classes that may be applied dynamically via JS data
  // Tailwind's JIT scanner only sees literal strings, so when class names
  // come from variables (e.g. props.bg) they can be purged unless we list
  // them here. Add any color/bg/spacing utilities you expect to use.
  safelist: [
    // background colours used in FEATURE cards
    "bg-primary",
    "bg-primary-dark",
    "bg-primary-light",
    "bg-accent",
    "bg-accent-dark",
    "bg-accent-light",
    // icon backgrounds
    "bg-primary",
    "bg-accent-dark",
    // other common dynamic utilities (add as needed)
    "md:mt-0",
    "md:mt-16",
  ],
};

export default config;
