<script lang="ts" setup>
import { computed } from "vue";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import WorkHeader from "~/components/work/WorkHeader.vue";
import WorkNextWork from "~/components/work/WorkNextWork.vue";
import WorkImages from "~/components/work/WorkImages.vue";
import WorkDescription from "~/components/work/WorkDescription.vue";
import { createWorkStructuredData } from "~/seo/structured-data/work";

const route = useRoute();
const { site } = useAppConfig();

const slug = computed(() => {
  const p = route.params.slug;
  return Array.isArray(p) ? p[0] : p;
});

const work = computed<WorkProjectPage | undefined>(() => {
  const key = String(slug.value || "");
  return worksBySlug[key];
});

if (!work.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Work not found",
    fatal: true,
  });
}

const currentIndex = computed(() =>
  orderedSlugs.indexOf(slug.value as (typeof orderedSlugs)[number]),
);

const totalWorks = orderedSlugs.length;

const currentSlug = computed(() => String(route.params.slug));

const title = work.value.title;
const description = work.value.metaDescription;
const ogImage = work.value.homeImage;
const canonicalUrl = computed(() => work.value!.url);
const structuredData = computed(() =>
  JSON.stringify(
    createWorkStructuredData({
      siteUrl: site.url,
      siteName: site.name,
      work: work.value!,
    }),
  ),
);

useSeoMeta({
  title: () => title,
  description: () => description,

  ogTitle: () => title,
  ogDescription: () => description,
  ogType: "article",
  ogUrl: () => work.value?.url,
  ogSiteName: () => site.name,
  ogImage: () => ogImage,
  ogImageAlt: () => `${work.value?.name} case study`,
  ogImageWidth: "1200",
  ogImageHeight: "630",

  twitterCard: "summary_large_image",
  twitterTitle: () => title,
  twitterDescription: () => description,
  twitterImage: () => ogImage,
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
      href: canonicalUrl,
    },
  ],
  script: [
    {
      id: "ld-json-work",
      type: "application/ld+json",
      innerHTML: structuredData,
    },
  ],
});
</script>

<template>
  <section v-if="work" class="bg-background text-foreground">
    <WorkHeader :current-index="currentIndex" :total-works="totalWorks" :work="work" />
    <WorkDescription :work="work" />
    <WorkImages :work="work" />
    <WorkNextWork :current-slug="currentSlug" />
  </section>
</template>
