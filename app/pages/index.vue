<script lang="ts" setup>
import HomeWorks from "~/components/home/works/HomeWorks.vue";
import Paragraph from "~/components/home/description/Paragraph.vue";
import WorksLoader from "~/components/home/works/WorksLoader.vue";

const loaderDone = ref(false);

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
  <section class="h-screen w-full flex flex-col justify-end">
    <Paragraph />
    <WorksLoader @done="loaderDone = true" />
    <HomeWorks />
  </section>
</template>
