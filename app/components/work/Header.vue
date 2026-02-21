<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import gsap from "gsap";

import { useCurtainTransition } from "~/composables/animations/useCurtainTransition";
import type { WorkProjectPage } from "~/domain/works/types";

const { phase } = useCurtainTransition();

const props = defineProps<{
  work: WorkProjectPage;
}>();

const rootEl = ref<HTMLElement | null>(null);
const imageWrapEl = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);
const roleEl = ref<HTMLElement | null>(null);
const metaBarEl = ref<HTMLElement | null>(null);

let tl: gsap.core.Timeline | null = null;

function buildTimeline() {
  if (!rootEl.value || !imageWrapEl.value) return;

  tl?.kill();
  tl = null;

  gsap.set(imageWrapEl.value, {
    y: 0,
    scaleX: 1,
    willChange: "transform",
    objectPosition: "top",
  });

  gsap.set([titleEl.value, roleEl.value, metaBarEl.value].filter(Boolean), {
    opacity: 0,
    y: 18,
    willChange: "transform, opacity",
  });

  tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  tl.to(
    imageWrapEl.value,
    {
      duration: 1.25,
      y: "80%",
      scaleX: 0.92,
      ease: "power3.inOut",
    },
    0,
  );

  // Texts fade up at the same time
  tl.to(
    [titleEl.value, roleEl.value].filter(Boolean),
    {
      duration: 0.9,
      opacity: 1,
      y: 0,
      stagger: 0.08,
    },
    0.05,
  );

  // Bottom bar fades up slightly after, still overlapping with image
  tl.to(
    metaBarEl.value,
    {
      duration: 0.9,
      opacity: 1,
      y: 0,
    },
    0.12,
  );
}

function play() {
  // Build fresh in case of resize or different work content
  buildTimeline();
}

function onResize() {
  // Recompute targetY on resize and replay at end-state quickly
  if (!tl) return;
  play();
}

onMounted(async () => {
  await nextTick();
  play();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
  tl?.kill();
  tl = null;
});
</script>

<template>
  <section
    ref="rootEl"
    :class="['covering', 'covered'].includes(phase) ? 'z-0' : 'z-20'"
    class="relative min-h-screen w-screen overflow-hidden"
  >
    <!-- Background text (can be absolute, that's fine) -->
    <div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div class="flex flex-col items-center text-center">
        <h1 ref="titleEl" class="text-4xl md:text-6xl font-medium leading-tight">
          {{ work?.name }}
        </h1>
        <p ref="roleEl" class="mt-3 text-base md:text-lg opacity-80">
          {{ work?.role }}
        </p>
      </div>
    </div>

    <!-- Bottom meta -->
    <div class="pointer-events-none absolute bottom-8 left-1/2 z-10 w-[60%] -translate-x-1/2">
      <div ref="metaBarEl" class="flex items-center justify-between text-sm md:text-base">
        <span class="opacity-80">{{ "01" }}-{{ "04" }}</span>
        <span class="opacity-80">{{ work?.date }}</span>
      </div>
    </div>

    <!-- Image layer IN FLOW (relative, not absolute) -->
    <div ref="imageWrapEl" class="relative z-20 h-screen w-screen will-change-transform">
      <img :src="work?.homeImage.url" alt="" class="h-full w-full origin-top" draggable="false" />
    </div>
  </section>
</template>
