with this code, instead of creating the scrolltrigger instance, add it to a gsap animation (ot whole
timeline). Also animate the container image and the image (they scale at differrent values, max at
60%)
<script lang="ts" setup>
import { computed } from "vue";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import RowSection from "~/components/work/RowSection.vue";
import Images from "~/components/work/Images.vue";
import Header from "~/components/work/Header.vue";

const { $gsap, $ScrollTrigger } = useNuxtApp();

const route = useRoute();
const router = useRouter();

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
const nextSlug = computed(() => {
  const index = orderedSlugs.indexOf(currentSlug.value as (typeof orderedSlugs)[number]);
  if (index === -1) {
    return orderedSlugs[0];
  }

  return orderedSlugs[(index + 1) % orderedSlugs.length];
});

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

const nextWorkContainerRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const roleRef = ref<HTMLElement | null>(null);
const progressFillRef = ref<HTMLElement | null>(null);
const nextWorkImageContainerRef = ref<HTMLElement | null>(null);
const nextWorkImageRef = ref<HTMLImageElement | null>(null);

const nextWork = computed<WorkProjectPage | undefined>(() => {
  return worksBySlug[String(nextSlug.value)];
});

function goToNextWork() {
  router.push({ params: { slug: nextSlug.value } });
}

onMounted(async () => {
  await nextTick();

  $ScrollTrigger.refresh();

  if (!nextWorkContainerRef.value || !progressFillRef.value) return;

  $gsap.set(progressFillRef.value, { scaleX: 0, transformOrigin: "left center" });

  $ScrollTrigger.create({
    trigger: nextWorkContainerRef.value,
    start: "top top",
    end: "+=100%",
    pin: true,
    markers: true,
    scrub: true,
    onUpdate(self) {
      $gsap.set(progressFillRef.value, { scaleX: self.progress });
    },
  });

  $ScrollTrigger.refresh();
});

onUnmounted(() => {
  $ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <section class="bg-background text-foreground">
    <Header v-if="work" :work="work" />
    <section class="flex flex-col gap-5 p-5 lg:flex-row">
      <Images v-if="work" :work="work" />
      <RowSection v-if="work" :work="work" />
    </section>
    <section
      ref="nextWorkContainerRef"
      class="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 overflow-y-hidden"
    >
      <div class="flex flex-col items-center pb-36 text-center">
        <h1 ref="titleRef" class="text-4xl font-medium uppercase md:text-9xl">Next Work</h1>
        <p ref="roleRef" class="mt-3 text-base md:text-2xl">[Scroll...]</p>
        <NuxtLink :to="nextSlug">Next Work</NuxtLink>
        <div class="bg-foreground/20 mt-6 h-0.5 w-56 overflow-hidden rounded-full md:w-96">
          <div
            ref="progressFillRef"
            class="bg-foreground h-full w-full rounded-full"
            style="transform: scaleX(0)"
          />
        </div>
        <div
          ref="nextWorkImageContainerRef"
          class="absolute -bottom-72 left-1/2 z-10 origin-center -translate-x-1/2 transform"
        >
          <img
            v-if="nextWork"
            ref="nextWorkImageRef"
            :alt="`${nextWork.name} preview`"
            :src="nextWork.homeImage.url"
            class="next-work-image"
          />
        </div>
      </div>
    </section>
  </section>
</template>
