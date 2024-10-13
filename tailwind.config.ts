import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#E6E8E0",
        lighter: "#ffffff",
        lightSecondary: "#6f716e",
        dark: "#1e1e1e",
        darker: "#000000",
        darkSecondary: "#575656",
        brand: "#FF4D4D",
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
