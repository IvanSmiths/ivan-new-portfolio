<script lang="ts" setup>
import { ref } from "vue";
import { useHorizontalScroll } from "~/composables/useHorizontalScroll";
import HomeWorks from "~/components/home/works/HomeWorks.vue";
import HomeDescription from "~/components/home/description/HomeDescription.vue";

const title =
  "Ivan Smiths - Fullstack Developer Specialized in Design and User Experience";
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
  charset: "utf-8"
});

const containerRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
useHorizontalScroll(containerRef, triggerRef);
</script>

<template>
  <HomeDescription />
  <HomeWorks />
</template>
