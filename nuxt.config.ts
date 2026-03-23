import tailwindcss from "@tailwindcss/vite";
import { worksPages } from "./app/domain/works";

const localePrefixes = ["it", "de"] as const;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxtjs/google-fonts", "@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "it", name: "Italian", file: "it.json" },
      { code: "de", name: "German", file: "de.json" },
    ],
  },
  devtools: { enabled: true },
  runtimeConfig: {
    openWeatherApiKey: process.env.OPEN_WEATHER_API,
    public: {
      gtagId: "G-55MHEPYVDV",
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  css: ["~/main.css"],
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss() as any],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "gsap",
        "gsap/dist/Flip", // CJS
        "gsap/dist/ScrollTrigger", // CJS
        "gsap/dist/SplitText", // CJS
        "tone",
      ],
    },
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  nitro: {
    prerender: {
      routes: [
        "/",
        "/about",
        "/lab",
        ...worksPages.map((work) => `/works/${work.slug}`),
        ...localePrefixes.flatMap((locale) => [
          `/${locale}`,
          `/${locale}/about`,
          `/${locale}/lab`,
          ...worksPages.map((work) => `/${locale}/works/${work.slug}`),
        ]),
      ],
    },
  },
  googleFonts: {
    families: {
      "DM Sans": {
        wght: [200, 400, 800],
      },
      "Old Standard TT": {
        wght: [400],
        ital: [400],
      },
    },
    display: "swap",
    preconnect: true,
  },
});
