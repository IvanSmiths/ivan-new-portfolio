<script lang="ts" setup>
import Experiments from "~/components/lab/Experiments.vue";
import { experiments } from "~/domain/lab/data/experiments";
import { createLabStructuredData } from "~/seo/structured-data/lab";

const { site } = useAppConfig();
const { t, te, tm } = useI18n();

const title = computed(() => t("seo.pages.lab.title"));
const description = computed(() => t("seo.pages.lab.description"));
const previewImageUrl =
  "https://res.cloudinary.com/deino2cjx/image/upload/v1773829369/home_nea5wi.jpg";
const ogImageAlt = computed(() => t("seo.common.ogImageAlt.lab"));
const labUrl = `${site.url}/lab`;
const aboutTopics = computed(() => tm("seo.structuredData.lab.aboutTopics") as string[]);
const structuredDataExperiments = computed(() =>
  experiments.map((experiment) => {
    const key = `lab.experiments.${experiment.id}.title`;
    return {
      title: te(key) ? t(key) : experiment.title,
      link: experiment.link,
    };
  }),
);
const structuredData = computed(() =>
  JSON.stringify(
    createLabStructuredData({
      siteUrl: site.url,
      pageTitle: title.value,
      pageDescription: description.value,
      experiments: structuredDataExperiments.value,
      aboutTopics: aboutTopics.value,
      breadcrumbHomeName: t("seo.common.breadcrumb.home"),
      breadcrumbLabName: t("seo.common.breadcrumb.lab"),
    }),
  ),
);

useSeoMeta({
  title: () => title.value,
  description: () => description.value,

  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogType: "website",
  ogUrl: () => labUrl,
  ogSiteName: () => site.name,
  ogImage: previewImageUrl,
  ogImageAlt: () => ogImageAlt.value,
  ogImageWidth: "1200",
  ogImageHeight: "630",

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
      innerHTML: structuredData,
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
