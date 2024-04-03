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
        primaryLight: "var(--primary-light)",
        primaryAccent: "var(--primary-accent)",
        secondary: "var(--secondary)",
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
    },
  },
  plugins: [],
};

export default config;
