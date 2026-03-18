<script lang="ts" setup>
import Experiments from "~/components/lab/Experiments.vue";

const title = "Ivan Smiths — Experiments and projects outside the web coding world.";
const description =
  "From music creation to 3d modeling to photography, here I post some of my old and current projects.";

useSeoMeta({
  title,
  description,

  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: "https://www.ivansmiths.com/about",
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
</script>

<template>
  <section
    class="bg-background text-foreground md:pt-md flex min-h-screen w-full flex-col justify-between"
  >
    <Experiments />
  </section>
</template>

<style scoped></style>
