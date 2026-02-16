import tailwindcss from "@tailwindcss/vite";
import { worksPages } from "./app/domain/works";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint"],
  devtools: { enabled: true },
  runtimeConfig: {
    openWeatherApiKey: process.env.OPEN_WEATHER_API,
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  app: {
    head: {
      title: "Ivan Smiths - Fullstack Developer Specialized in Design and User Experience",
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
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  nitro: {
    prerender: {
      routes: worksPages.map((work) => `/works/${work.slug}`),
    },
  },
});
