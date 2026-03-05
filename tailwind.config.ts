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
        "2xl": "1400px",
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
        primary:   ["var(--font-inter)", "sans-serif"],
        secondary: ["var(--font-josefin-sans)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#2563EB",
          dark:    "#1E40AF",
          light:   "#EFF6FF",
        },
        accent: {
          DEFAULT: "#10B981",
          light:   "#D1FAE5",
        },
        content: {
          DEFAULT: "#1E293B",
          muted:   "#64748B",
          inverse: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark:    "#1D3557",
        },
      },
      fontSize: {
        h1: ["3.5rem",  { lineHeight: "1.2",  fontWeight: "700" }],
        h2: ["2.5rem",  { lineHeight: "1.25", fontWeight: "600" }],
        h3: ["2rem",    { lineHeight: "1.3",  fontWeight: "600" }],
        h4: ["1.5rem",  { lineHeight: "1.35", fontWeight: "600" }],
        h5: ["1.25rem", { lineHeight: "1.4",  fontWeight: "500" }],
        h6: ["1rem",    { lineHeight: "1.5",  fontWeight: "500" }],
        "h1-mobile": ["2.5rem",   { lineHeight: "1.2",  fontWeight: "700" }],
        "h2-mobile": ["2rem",     { lineHeight: "1.25", fontWeight: "600" }],
        "h3-mobile": ["1.5rem",   { lineHeight: "1.3",  fontWeight: "600" }],
        "h4-mobile": ["1.25rem",  { lineHeight: "1.35", fontWeight: "600" }],
        "h5-mobile": ["1.125rem", { lineHeight: "1.4",  fontWeight: "500" }],
        "h6-mobile": ["1rem",     { lineHeight: "1.5",  fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};

export default config;