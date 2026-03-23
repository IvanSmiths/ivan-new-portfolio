<script lang="ts" setup>
import WorksLoop from "~/components/home/works/WorksLoop.vue";
import AppGrid from "~/components/global/grid/AppGrid.vue";
import Paragraph from "~/components/home/description/Paragraph.vue";
import { createHomeStructuredData } from "~/seo/structured-data/home";

const appConfig = useAppConfig();
const { site } = appConfig;
const { t, locale } = useI18n();

const title = computed(() => t("seo.pages.home.title"));
const description = computed(() => t("seo.pages.home.description"));
const previewImageUrl =
  "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg";
const ogImageAlt = computed(() => t("seo.common.ogImageAlt.portfolio"));
const structuredData = computed(() =>
  JSON.stringify(
    createHomeStructuredData({
      siteUrl: site.url,
      siteName: site.name,
      imageUrl: previewImageUrl,
      jobTitle: t("seo.structuredData.personJobTitle"),
      websiteDescription: t("seo.structuredData.websiteDescription", { name: site.name }),
      portfolioDescription: t("seo.structuredData.portfolioDescription"),
      language: locale.value,
    }),
  ),
);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,

  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogType: "website",
  ogUrl: () => site.url,
  ogSiteName: () => site.name,
  ogImage: previewImageUrl,
  ogImageWidth: "1209",
  ogImageHeight: "660",
  ogImageAlt: () => ogImageAlt.value,

  twitterCard: "summary_large_image",
  twitterTitle: () => title.value,
  twitterDescription: () => description.value,
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
    lang: locale,
  },
  script: [
    {
      id: "ld-json",
      type: "application/ld+json",
      innerHTML: structuredData,
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
