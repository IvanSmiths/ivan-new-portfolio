import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        brand: "var(--brand)",
        primaryLight: "var(--primary-light)",
        primaryAccent: "var(--primary-accent)",
        secondary: "var(--secondary)",
        secondaryLight: "var(--secondary-light)",
        secondaryLighter: "var(--secondary-lighter)",
      },
      transitionProperty: {
        dimensions: "height, width",
      },
      spacing: {
        smallest: "var(--smallest)",
        small: "var(--small)",
        medium: "var(--medium)",
        regular: "var(--regular)",
        large: "var(--large)",
        section: "var(--section)",
      },
      animation: {
        "fade-in": "fadeIn 400ms ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
