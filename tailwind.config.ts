// tailwind.config.js
/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "class", // Enables .dark class
  content: [
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        "background": "var(--background)",
        "background-muted": "var(--background-muted)",
        "foreground": "var(--foreground)",
        "foreground-muted": "var(--foreground-muted)",
        "brand-primary": "var(--color-brand-primary)",
        "brand-secondary": "var(--color-brand-secondary)",
        "white": "var(--color-white)",
        "black": "var(--color-black)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
        "5xl": "var(--spacing-5xl)"
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(5px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" }
        }
      }
    }
  },
  plugins: []
};
