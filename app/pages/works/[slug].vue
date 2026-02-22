<script lang="ts" setup>
import { computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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

const nextWorkContainer = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();
  ScrollTrigger.refresh();
});
</script>

<template>
  <section class="bg-background text-foreground">
    <Header v-if="work" :work="work" />
    <section class="flex p-5 gap-5 flex-col lg:flex-row">
      <Images v-if="work" :work="work" />
      <RowSection v-if="work" :work="work" />
    </section>
    <section
      ref="nextWorkContainer"
      class="flex flex-col gap-5 justify-center items-center min-h-screen w-full"
    >
      <div class="flex flex-col items-center text-center">
        <h1 ref="titleEl" class="text-4xl md:text-9xl uppercase font-medium">Next Work</h1>
        <p ref="roleEl" class="mt-3 text-base md:text-2xl">[Scroll...]</p>
        <div class="mt-6 w-56 md:w-96 h-0.5 rounded-full bg-foreground/20 overflow-hidden">
          <div
            ref="progressFillEl"
            class="h-full w-full bg-foreground rounded-full"
            style="transform: scaleX(0)"
          />
        </div>
      </div>
    </section>
  </section>
</template>
