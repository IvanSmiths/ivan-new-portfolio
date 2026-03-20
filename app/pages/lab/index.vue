<script lang="ts" setup>
import Experiments from "~/components/lab/Experiments.vue";
import { experiments } from "~/domain/lab/data/experiments";
import { createLabStructuredData } from "~/seo/structured-data/lab";

const { site } = useAppConfig();

const title = "Projects & Creative Stuff | Ivan Smiths";
const description =
  "A collection of projects exploring 3D modeling, music, and photography. Built by Ivan Smiths, Full-Stack Developer and UX Engineer.";
const previewImageUrl =
  "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg";
const labUrl = `${site.url}/lab`;

useSeoMeta({
  title: () => title,
  description: () => description,

  ogTitle: () => title,
  ogDescription: () => description,
  ogType: "website",
  ogUrl: () => labUrl,
  ogSiteName: () => site.name,
  ogImage: previewImageUrl,
  ogImageAlt: "Ivan Smiths creative lab preview",
  ogImageWidth: "1200",
  ogImageHeight: "630",

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
  link: [
    {
      rel: "canonical",
      href: labUrl,
    },
  ],
  script: [
    {
      id: "ld-json-lab",
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        createLabStructuredData({
          siteUrl: site.url,
          pageTitle: title,
          pageDescription: description,
          experiments,
        }),
      ),
    },
  ],
});
</script>

<template>
  <section
    class="bg-background text-foreground pt-md flex min-h-screen w-full flex-col justify-between"
  >
    <Experiments />
  </section>
</template>

<style scoped></style>
