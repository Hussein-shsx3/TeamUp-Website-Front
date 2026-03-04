import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Container max-widths per breakpoint
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem", // mobile
        sm: "1.5rem", // 640px
        md: "2rem", // 768px
        lg: "2rem", // 1024px
        xl: "2rem", // 1280px
        "2xl": "2rem", // 1536px
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
      // Breakpoints (default Tailwind + explicit for clarity)
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        // Heading sizes - Desktop
        h1: ["3.5rem", { lineHeight: "1.2", fontWeight: "700" }], // 56px
        h2: ["2.5rem", { lineHeight: "1.25", fontWeight: "600" }], // 40px
        h3: ["2rem", { lineHeight: "1.3", fontWeight: "600" }], // 32px
        h4: ["1.5rem", { lineHeight: "1.35", fontWeight: "600" }], // 24px
        h5: ["1.25rem", { lineHeight: "1.4", fontWeight: "500" }], // 20px
        h6: ["1rem", { lineHeight: "1.5", fontWeight: "500" }], // 16px
        // Heading sizes - Mobile
        "h1-mobile": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }], // 40px
        "h2-mobile": ["2rem", { lineHeight: "1.25", fontWeight: "600" }], // 32px
        "h3-mobile": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        "h4-mobile": ["1.25rem", { lineHeight: "1.35", fontWeight: "600" }], // 20px
        "h5-mobile": ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }], // 18px
        "h6-mobile": ["1rem", { lineHeight: "1.5", fontWeight: "500" }], // 16px
      },
    },
  },
  plugins: [],
};

export default config;
