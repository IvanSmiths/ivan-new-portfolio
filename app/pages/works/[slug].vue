<script lang="ts" setup>
import { computed } from "vue";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import WorkHeader from "~/components/work/WorkHeader.vue";
import WorkNextWork from "~/components/work/WorkNextWork.vue";
import WorkImages from "~/components/work/WorkImages.vue";
import WorkDescription from "~/components/work/WorkDescription.vue";

const route = useRoute();

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

useSeoMeta({
  title,
  description,

  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: work.value.url,
  ogSiteName: title,
  ogImage: ogImage,
  ogImageAlt: `${work.value.name} case study`,

  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
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
  <section v-if="work" class="bg-background text-foreground">
    <WorkHeader :current-index="currentIndex" :total-works="totalWorks" :work="work" />
    <WorkDescription :work="work" />
    <WorkImages :work="work" />
    <WorkNextWork :current-slug="currentSlug" />
  </section>
</template>
