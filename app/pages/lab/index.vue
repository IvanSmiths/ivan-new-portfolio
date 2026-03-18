<script lang="ts" setup>
import Experiments from "~/components/lab/Experiments.vue";
import { experiments } from "~/domain/lab/data/experiments";

const title = "Projects & Creative Stuff | Ivan Smiths";
const description =
  "A collection of projects exploring 3D modeling, music, and photography. Built by Ivan Smiths, Full-Stack Developer and UX Engineer.";

useSeoMeta({
  title: () => title,
  description: () => description,

  ogTitle: () => title,
  ogDescription: () => description,
  ogType: "website",
  ogUrl: "https://www.ivansmiths.com/lab",
  ogSiteName: () => title,
  ogImage: "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg",
  ogImageAlt: "Ivan Smiths creative lab preview",
  ogImageWidth: "1200",
  ogImageHeight: "630",

  twitterCard: "summary_large_image",
  twitterTitle: () => title,
  twitterDescription: () => description,
  twitterImage: "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg",
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
      href: "https://www.ivansmiths.com/lab",
    },
  ],
  script: [
    {
      id: "ld-json-lab",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": "https://www.ivansmiths.com/lab#lab",
            url: "https://www.ivansmiths.com/lab",
            name: title,
            description: description,
            isPartOf: {
              "@id": "https://www.ivansmiths.com/#website",
            },
            about: [
              "Creative Coding",
              "3D Modeling",
              "Music Production",
              "Photography",
              "Digital Experiments",
            ],
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://www.ivansmiths.com/lab#breadcrumbs",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ivansmiths.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Lab",
                item: "https://www.ivansmiths.com/lab",
              },
            ],
          },
          {
            "@type": "ItemList",
            itemListElement: experiments.map((ex, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: ex.title,
              url: ex.link,
            })),
          },
        ],
      }),
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
