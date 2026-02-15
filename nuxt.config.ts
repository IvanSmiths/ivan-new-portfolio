import tailwindcss from "@tailwindcss/vite";
import { worksData } from "./utils/data/works";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint"],
  devtools: { enabled: true },
  app: {
    head: {
      title:
        "Ivan Smiths - Fullstack Developer Specialized in Design and User Experience",
      htmlAttrs: {
        lang: "en"
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    }
  },
  css: ["~/main.css"],
  compatibilityDate: "2025-07-15",
  vite: {
    plugins: [tailwindcss() as any]
  },
  eslint: {
    config: {
      stylistic: true
    }
  },
  nitro: {
    prerender: {
      routes: worksData.map((work) => `/works/${work.slug}`)
    }
  }
});
