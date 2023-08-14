/** @type {import('tailwindcss').Config} */
module.exports = {
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
                "brand": "var(--brand)",
                "primary": "var(--primary)",
                "primary-light": "var(--primary-light)",
                "secondary": "var(--secondary)"
            },
            spacing: {
                "small": "var(--small)",
                "medium": "var(--medium)",
            },
        },
    },
    plugins: [],
}