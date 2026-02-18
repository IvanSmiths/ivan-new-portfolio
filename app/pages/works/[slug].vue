<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { Link, WorkProjectPage } from "~/domain/works/types";
import { useCurtainTransition } from "~/composables/animations/useCurtainTransition";

const { phase } = useCurtainTransition();
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

const workLinks = computed<Link[]>(() => work.value?.worksDone ?? []);
const hasExternalWebsite = computed(() => Boolean(work.value?.websiteLink?.startsWith("http")));
const hasExternalLinkedin = computed(() => Boolean(work.value?.linkedinLink?.startsWith("http")));
const hasManyImages = computed(() => (work.value?.images?.length ?? 0) > 1);

const currentSlug = computed(() => String(route.params.slug));
const nextSlug = computed(() => {
  const index = orderedSlugs.indexOf(currentSlug.value as (typeof orderedSlugs)[number]);
  if (index === -1) {
    return orderedSlugs[0];
  }

  return orderedSlugs[(index + 1) % orderedSlugs.length];
});

const scrollSectionRef = ref<HTMLElement | null>(null);
const fillLineRef = ref<HTMLElement | null>(null);
let gsapContext: gsap.Context | null = null;
const hasNavigated = ref(false);

onMounted(() => {
  gsapContext = gsap.context(() => {
    if (!scrollSectionRef.value || !fillLineRef.value) {
      return;
    }

    gsap.set(fillLineRef.value, { scaleX: 0, transformOrigin: "left center" });

    gsap.to(fillLineRef.value, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: scrollSectionRef.value,
        start: "10% 70%",
        end: "90% 95%",
        markers: true,
        scrub: true,
        onUpdate: (self) => {
          if (!hasNavigated.value && self.progress >= 0.999) {
            hasNavigated.value = true;
            navigateTo(`/works/${nextSlug.value}`);
          }
        },
      },
    });
  });
});

onUnmounted(() => {
  gsapContext?.revert();
  gsapContext = null;
});
</script>

<template>
  <section class="bg-background text-foreground">
    <div
      :class="['covering', 'covered'].includes(phase) ? 'z-0' : 'z-20'"
      class="relative top-0 left-0 w-full h-full"
    >
      <img :src="work?.homeImage.url" alt="" class="h-full w-full object-cover" />
    </div>
    <div class="p-2.5">
      <ul class="space-y-3 text-base leading-relaxed">
        <li v-for="(item, index) in work?.description" :key="`desc-${index}`">
          {{ item }}
        </li>
      </ul>
    </div>
    <section class="flex p-2.5 5 w-full flex-row text-center">
      <div v-if="hasManyImages" class="h-full w-full">
        <img
          v-for="(image, index) in work?.images?.slice(1)"
          :key="`gallery-${index}`"
          :alt="`${work?.name} image ${index + 2}`"
          :src="image"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="flex flex-col gap-2 w-2/5 pl-2.5 items-start text-sm text-left">
        <h2>Company: {{ work?.name }}</h2>
        <h3>Role: {{ work?.role }}</h3>
        <h4>{{ work?.date }}</h4>
        <NuxtLink
          v-if="hasExternalWebsite"
          :to="work?.websiteLink"
          class="mt-2.5"
          external
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit website
        </NuxtLink>
        <NuxtLink
          v-if="hasExternalLinkedin"
          :to="work?.linkedinLink"
          external
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit LinkedIn
        </NuxtLink>
        <div class="mt-2.5 flex flex-row flex-wrap items-center gap-0.5">
          <span>Clients:</span>
          <NuxtLink
            v-for="entry in workLinks"
            :key="entry.label"
            :external="entry.link.startsWith('http')"
            :rel="entry.link.startsWith('http') ? 'noopener noreferrer' : undefined"
            :target="entry.link.startsWith('http') ? '_blank' : undefined"
            :to="entry.link"
          >
            {{ entry.label }}
          </NuxtLink>
        </div>
        <div class="mt-2.5 flex flex-row flex-wrap items-center gap-0.5">
          <span>Tech:</span>
          <span v-for="tech in work?.stack" :key="tech">
            {{ tech }}
          </span>
        </div>
      </div>
    </section>
    <section
      ref="scrollSectionRef"
      class="mx-auto mt-14 flex h-[34vh] w-full max-w-6xl items-end border-t border-black/10 pb-8"
    >
      <div class="w-full">
        <p class="text-foreground-muted mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
          Scroll to see next project
        </p>
        <div class="relative h-0.5 w-full bg-[#cccccc]">
          <div ref="fillLineRef" class="absolute inset-y-0 left-0 h-full w-full bg-black" />
        </div>
      </div>
    </section>
  </section>
</template>
