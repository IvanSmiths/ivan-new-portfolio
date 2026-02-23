<script lang="ts" setup>
import { computed } from "vue";
import { worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import RowSection from "~/components/work/RowSection.vue";
import Header from "~/components/work/Header.vue";
import NextWork from "~/components/work/NextWork.vue";

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

const currentSlug = computed(() => String(route.params.slug));

const title = work.value.title;
const description = work.value.metaDescription;
const coverImage = work.value.images[0] ?? work.value.homeImage.url;

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
  <section class="bg-background text-foreground">
    <Header v-if="work" :work="work" />
    <section class="flex flex-col gap-5 p-5 lg:flex-row">
      <RowSection v-if="work" :work="work" />
    </section>
    <NextWork :current-slug="currentSlug" />
  </section>
</template>
