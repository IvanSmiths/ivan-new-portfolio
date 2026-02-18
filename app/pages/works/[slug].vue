<script lang="ts" setup>
import { computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import RowSection from "~/components/work/RowSection.vue";
import Images from "~/components/work/Images.vue";
import Header from "~/components/work/Header.vue";

gsap.registerPlugin(ScrollTrigger);

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

const hasManyImages = computed(() => (work.value?.images?.length ?? 0) > 1);
const currentSlug = computed(() => String(route.params.slug));
const nextSlug = computed(() => {
  const index = orderedSlugs.indexOf(currentSlug.value as (typeof orderedSlugs)[number]);
  if (index === -1) {
    return orderedSlugs[0];
  }

  return orderedSlugs[(index + 1) % orderedSlugs.length];
});
</script>

<template>
  <section class="bg-background text-foreground">
    <Header v-if="work" :work="work" />
    <section class="flex p-2.5 flex-col lg:flex-row">
      <Images v-if="work" :work="work" />
      <RowSection v-if="work" :work="work" />
    </section>
  </section>
</template>
