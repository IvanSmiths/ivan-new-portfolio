<script lang="ts" setup>
import WorksLoop from "~/components/home/works/WorksLoop.vue";
import Logo from "~/components/home/description/Logo.vue";
import AppGrid from "~/components/global/grid/AppGrid.vue";

const title = "Ivan Smiths - Fullstack Developer Specialized in Design and User Experience";
const description =
  "Fullstack Developer with over 4 years of experience in building user-centered websites and applications for clients like Deutsche Bahn, R+V, Adidas, and WMF. Skilled in Next.js, TypeScript, and UX design, I enhance digital experiences through innovative, data-driven solutions and seamless functionality.";

useSeoMeta({
  title,
  description,

  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: "https://example.com",
  ogSiteName: title,
  ogImage: "https://example.com/image.png",
  ogImageAlt: "Preview image for My Amazing Site",

  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: "https://example.com/image.png",
  twitterCreator: "@mytwitterhandle",
  twitterSite: "@mytwitterhandle",

  author: "Ivan Smiths",
  applicationName: "Ivan Smiths Portfolio",
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
    <AppGrid class="min-h-svh overflow-visible">
      <WorksLoop class="col-span-full" />
    </AppGrid>
    <Logo />
  </section>
</template>
