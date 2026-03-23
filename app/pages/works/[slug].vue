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
const { t, te, locale } = useI18n();

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

function workTranslationKey(suffix: string) {
  return `works.${String(slug.value)}.${suffix}`;
}

function tWork(suffix: string, fallback: string) {
  const key = workTranslationKey(suffix);
  return te(key) ? t(key) : fallback;
}

const currentIndex = computed(() =>
  orderedSlugs.indexOf(slug.value as (typeof orderedSlugs)[number]),
);

const totalWorks = orderedSlugs.length;

const currentSlug = computed(() => String(route.params.slug));

const localizedWork = computed<WorkProjectPage>(() => {
  const base = work.value!;
  return {
    ...base,
    date: tWork("date", base.date),
    role: tWork("role", base.role),
    shortDescription: tWork("shortDescription", base.shortDescription),
    description: tWork("description", base.description),
    title: tWork("seoTitle", base.title),
    metaDescription: tWork("seoDescription", base.metaDescription),
  };
});

const pageTitle = computed(() => localizedWork.value.title);
const pageDescription = computed(() => localizedWork.value.metaDescription);
const ogImage = computed(() => localizedWork.value.homeImage);
const ogImageAlt = computed(() =>
  t("seo.common.ogImageAlt.work", { name: String(localizedWork.value?.name ?? "") }),
);
const canonicalUrl = computed(() => localizedWork.value.url);
const structuredData = computed(() =>
  JSON.stringify(
    createWorkStructuredData({
      siteUrl: site.url,
      siteName: site.name,
      work: localizedWork.value,
      breadcrumbHomeName: t("seo.common.breadcrumb.home"),
      language: locale.value,
    }),
  ),
);

useSeoMeta({
  title: () => pageTitle.value,
  description: () => pageDescription.value,

  ogTitle: () => pageTitle.value,
  ogDescription: () => pageDescription.value,
  ogType: "article",
  ogUrl: () => canonicalUrl.value,
  ogSiteName: () => site.name,
  ogImage: () => ogImage.value,
  ogImageAlt: () => ogImageAlt.value,
  ogImageWidth: "1200",
  ogImageHeight: "630",

  twitterCard: "summary_large_image",
  twitterTitle: () => pageTitle.value,
  twitterDescription: () => pageDescription.value,
  twitterImage: () => ogImage.value,
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
  <section v-if="localizedWork" class="bg-background text-foreground">
    <WorkHeader :current-index="currentIndex" :total-works="totalWorks" :work="localizedWork" />
    <WorkDescription :work="localizedWork" />
    <WorkImages :work="localizedWork" />
    <WorkNextWork :current-slug="currentSlug" />
  </section>
</template>
