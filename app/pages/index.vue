<script lang="ts" setup>
import WorksLoop from "~/components/home/works/WorksLoop.vue";
import AppGrid from "~/components/global/grid/AppGrid.vue";
import Paragraph from "~/components/home/description/Paragraph.vue";

const title = "Full-Stack Developer From Wiesbaden | Ivan Smiths";
const description =
  "Full-Stack Developer specialized in UI/UX design. 5+ years building high-performance, user-focused web apps for brands like Adidas and Deutsche Bahn.";

useSeoMeta({
  title: () => title,
  description: () => description,

  ogTitle: () => title,
  ogDescription: () => description,
  ogType: "website",
  ogUrl: "https://www.ivansmiths.com",
  ogSiteName: "Ivan Smiths",
  ogImage: "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg",
  ogImageWidth: "1209",
  ogImageHeight: "660",
  ogImageAlt: "Ivan Smiths's portfolio preview",

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
  link: [{ rel: "canonical", href: "https://www.ivansmiths.com" }],
  htmlAttrs: {
    class: "home-page bg-background",
    lang: "en",
  },
  script: [
    {
      id: "ld-json",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": "https://www.ivansmiths.com/#person",
            name: "Ivan Smiths",
            url: "https://www.ivansmiths.com",
            jobTitle: "Full-Stack Developer",
            image: "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg",
            sameAs: ["https://twitter.com/IvanSmiths"],
            knowsAbout: [
              "React",
              "Vue",
              "TypeScript",
              "UX Design",
              "Frontend Development",
              "Web Performance",
            ],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.ivansmiths.com/#website",
            url: "https://www.ivansmiths.com",
            name: "Ivan Smiths Portfolio",
            description:
              "Portfolio of Ivan Smiths, Full-Stack Developer specializing in Next.js and UX.",
            publisher: {
              "@id": "https://www.ivansmiths.com/#person",
            },
          },
          {
            "@type": "CreativeWork",
            "@id": "https://www.ivansmiths.com/#portfolio",
            name: "Ivan Smiths Portfolio",
            creator: {
              "@id": "https://www.ivansmiths.com/#person",
            },
            url: "https://www.ivansmiths.com",
            description:
              "A collection of projects showcasing full-stack development and UX expertise.",
            inLanguage: "en",
          },
        ],
      }),
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
