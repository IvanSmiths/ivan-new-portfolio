<script lang="ts" setup>
import WorksLoop from "~/components/home/works/WorksLoop.vue";
import AppGrid from "~/components/global/grid/AppGrid.vue";
import Paragraph from "~/components/home/description/Paragraph.vue";
import { createHomeStructuredData } from "~/seo/structured-data/home";

const appConfig = useAppConfig();
const { site } = appConfig;

const title = "Full-Stack Developer From Wiesbaden | Ivan Smiths";
const description =
  "Full-Stack Developer specialized in UI/UX design. 5+ years building high-performance, user-focused web apps for brands like Adidas and Deutsche Bahn.";
const previewImageUrl =
  "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg";

useSeoMeta({
  title: () => title,
  description: () => description,

  ogTitle: () => title,
  ogDescription: () => description,
  ogType: "website",
  ogUrl: () => site.url,
  ogSiteName: () => site.name,
  ogImage: previewImageUrl,
  ogImageWidth: "1209",
  ogImageHeight: "660",
  ogImageAlt: "Ivan Smiths's portfolio preview",

  twitterCard: "summary_large_image",
  twitterTitle: () => title,
  twitterDescription: () => description,
  twitterImage: previewImageUrl,
  twitterCreator: "@IvanSmiths",
  twitterSite: "@IvanSmiths",

  author: "Ivan Smiths",
  applicationName: "Ivan Smiths Portfolio",
  generator: "Nuxt",
  robots: "index, follow",
  charset: "utf-8",
});

useHead({
  link: [{ rel: "canonical", href: site.url }],
  htmlAttrs: {
    class: "home-page bg-background",
    lang: "en",
  },
  script: [
    {
      id: "ld-json",
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        createHomeStructuredData({
          siteUrl: site.url,
          siteName: site.name,
          imageUrl: previewImageUrl,
        }),
      ),
    },
  ],
});
</script>

<template>
  <section class="bg-background relative min-h-svh">
    <AppGrid :padded="false" class="min-h-svh overflow-visible">
      <WorksLoop class="col-span-full" />
    </AppGrid>
    <Paragraph class="mt-md pointer-events-auto" />
  </section>
</template>
