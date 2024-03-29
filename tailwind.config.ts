import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        secondary: "var(--secondary)",
        white: "#ECECEC",
      },
      transitionProperty: {
        dimensions: "height, width",
      },
      spacing: {
        smallest: "var(--smallest)",
        small: "var(--small)",
        medium: "var(--medium)",
        section: "var(--section)",
      },
      grayscale: {
        50: "50%",
      },
    },
  },
  plugins: [],
};

export default config;