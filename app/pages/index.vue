<script lang="ts" setup>
import WorksLoop from "~/components/home/works/WorksLoop.vue";
import AppGrid from "~/components/global/grid/AppGrid.vue";
import Paragraph from "~/components/home/description/Paragraph.vue";

const title = "Ivan Smiths — Fullstack Developer Specialized in Design and User Experience";
const description =
  "Fullstack Developer with over 5 years of experience in building user-centered websites and applications for clients like Deutsche Bahn, R+V, Adidas, and WMF. Skilled in Next.js, TypeScript, and UX design, I enhance digital experiences through innovative, data-driven solutions and seamless functionality.";

useSeoMeta({
  title,
  description,

  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: "https://www.ivansmiths.com",
  ogSiteName: title,
  ogImage: "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg",
  ogImageAlt: "Ivan Smiths's portfolio preview",

  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg",
  twitterCreator: "@IvanSmiths",
  twitterSite: "@IvanSmiths",

  author: "Ivan Smiths",
  applicationName: "Ivan Smiths's Portfolio",
  generator: "Nuxt",
  robots: "index, follow",
  charset: "utf-8",
});

useHead({
  htmlAttrs: {
    class: "home-page bg-background",
  },
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
