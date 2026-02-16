<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Link, WorkProjectPage } from "~~/utils/data/works/types";
import { orderedSlugs, worksBySlug } from "~/domain/works";

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
  <article class="bg-background text-foreground min-h-screen">
    <div>
      <img :src="work.homeImage.url" alt="" class="h-full w-full" />
    </div>
    <header class="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
      <p class="text-foreground-muted text-xs font-semibold tracking-[0.22em] uppercase">
        {{ work?.type }}
      </p>
      <h1
        class="mt-2 text-4xl leading-[0.9] font-black tracking-tight uppercase sm:text-6xl lg:text-8xl"
      >
        {{ work?.name }}
      </h1>

      <p class="text-foreground-muted mt-4 text-sm font-medium uppercase">
        {{ work?.role }}
      </p>

      <div
        class="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold uppercase"
      >
        <NuxtLink
          v-if="hasExternalWebsite"
          :to="work?.websiteLink"
          class="hover:opacity-70 transition"
          external
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit website
        </NuxtLink>
        <span v-if="hasExternalWebsite && hasExternalLinkedin">/</span>
        <NuxtLink
          v-if="hasExternalLinkedin"
          :to="work?.linkedinLink"
          class="hover:opacity-70 transition"
          external
          rel="noopener noreferrer"
          target="_blank"
        >
          Visit LinkedIn
        </NuxtLink>
      </div>
    </header>

    <section class="mx-auto mt-8 w-full max-w-6xl">
      <div class="mx-auto max-w-4xl overflow-hidden border border-black/10 bg-black/3">
        <img
          :alt="`${work?.name} cover image`"
          :src="coverImage"
          class="mx-auto h-auto w-full object-cover"
          loading="eager"
        />
      </div>
    </section>

    <section
      class="mx-auto mt-10 grid w-full max-w-6xl gap-8 border-t border-black/10 pt-8 lg:grid-cols-[2fr_1fr]"
    >
      <div class="space-y-6">
        <div>
          <p class="text-foreground-muted text-xs font-semibold tracking-[0.18em] uppercase">
            Overview
          </p>
          <ul class="mt-4 space-y-3 text-base leading-relaxed">
            <li v-for="(item, index) in work?.description" :key="`desc-${index}`">
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="workLinks.length">
          <p class="text-foreground-muted text-xs font-semibold tracking-[0.18em] uppercase">
            Works Done
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            <NuxtLink
              v-for="entry in workLinks"
              :key="entry.label"
              :external="entry.link.startsWith('http')"
              :rel="entry.link.startsWith('http') ? 'noopener noreferrer' : undefined"
              :target="entry.link.startsWith('http') ? '_blank' : undefined"
              :to="entry.link"
              class="border border-black/15 px-3 py-1.5 text-sm font-medium uppercase transition hover:bg-black hover:text-white"
            >
              {{ entry.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <aside class="space-y-8">
        <div>
          <p class="text-foreground-muted text-xs font-semibold tracking-[0.18em] uppercase">
            Date
          </p>
          <p class="mt-2 text-sm font-medium">{{ work?.date }}</p>
        </div>

        <div>
          <p class="text-foreground-muted text-xs font-semibold tracking-[0.18em] uppercase">
            Stack
          </p>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li
              v-for="tech in work?.stack"
              :key="tech"
              class="bg-black/5 px-2.5 py-1 text-xs font-semibold uppercase"
            >
              {{ tech }}
            </li>
          </ul>
        </div>
      </aside>
    </section>

    <section
      v-if="hasManyImages"
      class="mx-auto mt-12 grid w-full max-w-6xl gap-6 border-t border-black/10 pt-8 md:grid-cols-2"
    >
      <img
        v-for="(image, index) in work?.images?.slice(1)"
        :key="`gallery-${index}`"
        :alt="`${work?.name} image ${index + 2}`"
        :src="image"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </section>

    <section
      ref="scrollSectionRef"
      class="mx-auto mt-14 flex h-[34vh] w-full max-w-6xl items-end border-t border-black/10 pb-8"
    >
      <div class="w-full">
        <p class="text-foreground-muted mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
          Scroll to see next project
        </p>
        <div class="relative h-[2px] w-full bg-[#cccccc]">
          <div ref="fillLineRef" class="absolute inset-y-0 left-0 h-full w-full bg-black" />
        </div>
      </div>
    </section>
  </article>
</template>
