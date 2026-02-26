<script lang="ts" setup>
import { computed } from "vue";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import RowSection from "~/components/work/RowSection.vue";
import Header from "~/components/work/Header.vue";
import NextWork from "~/components/work/NextWork.vue";
import Images from "~/components/work/Images.vue";

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

const coverImage = computed(() => {
  if (!work.value) return "";
  const firstImage = work.value.images[0];
  if (!firstImage) return work.value.homeImage.url;

  if (firstImage.layout === "single") {
    return firstImage.src;
  }
  return firstImage.src[0];
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: work.value.url,
  ogSiteName: title,
  ogImage: coverImage,
  ogImageAlt: `${work.value.name} project preview`,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: coverImage,
  twitterCreator: "@mytwitterhandle",
  twitterSite: "@mytwitterhandle",
  author: "Ivan Smiths",
  applicationName: "Ivan Smiths Portfolio",
  generator: "Nuxt",
  robots: "index, follow",
  charset: "utf-8",
});
</script>

<template>
  <section v-if="work" class="bg-background text-foreground">
    <Header :current-index="currentIndex" :total-works="totalWorks" :work="work" />
    <Images :work="work" />
    <RowSection :work="work" />
    <NextWork :current-slug="currentSlug" />
  </section>
</template>
