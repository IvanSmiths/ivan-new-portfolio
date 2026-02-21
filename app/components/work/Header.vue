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
const spacerEl = ref<HTMLElement | null>(null);

let tl: gsap.core.Timeline | null = null;

function buildTimeline() {
  if (!rootEl.value || !imageWrapEl.value) return;

  tl?.kill();
  tl = null;

  gsap.set(imageWrapEl.value, {
    translateY: 0,
    scaleX: 1,
    willChange: "transform",
    objectPosition: "top",
  });

  gsap.set([titleEl.value, roleEl.value, metaBarEl.value].filter(Boolean), {
    opacity: 0,
    translateY: 18,
    willChange: "transform, opacity",
  });

  const multiplier = 7;

  const imageHeight = imageWrapEl.value.offsetHeight;
  const extraSpaceNeeded = imageHeight * (multiplier / 10);

  gsap.set(spacerEl.value, { height: 0 });

  tl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  tl.to(
    imageWrapEl.value,
    {
      duration: 1.25,
      translateY: `${multiplier * 10}%`,
      scaleX: 0.92,
      ease: "power3.inOut",
    },
    0,
  );
  tl.to(
    spacerEl.value,
    {
      duration: 1.25,
      height: extraSpaceNeeded,
      ease: "power3.inOut",
    },
    0,
  );
  tl.to(
    [titleEl.value, roleEl.value].filter(Boolean),
    {
      duration: 0.9,
      opacity: 1,
      delay: 0.8,
      translateY: 0,
      stagger: 0.08,
    },
    0.05,
  );
  tl.to(
    metaBarEl.value,
    {
      duration: 0.9,
      opacity: 1,
      delay: 0.8,
      translateY: 0,
    },
    0.12,
  );
}

function play() {
  buildTimeline();
}

function onResize() {
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
    class="relative"
  >
    <div class="absolute top-48 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
      <div class="flex flex-col items-center text-center">
        <h1 ref="titleEl" class="text-4xl md:text-9xl uppercase font-medium">
          {{ work?.name }}
        </h1>
        <p ref="roleEl" class="mt-3 text-base md:text-2xl">[{{ work?.role }}]</p>
      </div>
    </div>

    <div class="absolute top-140 left-1/2 z-10 w-[60%] -translate-x-1/2">
      <div ref="metaBarEl" class="flex items-center justify-between text-sm md:text-base">
        <span>{{ "01" }}-{{ "04" }}</span>
        <span>{{ work?.date }}</span>
      </div>
    </div>

    <div ref="imageWrapEl" class="relative z-20 will-change-transform">
      <img :src="work?.homeImage.url" alt="" class="origin-top object-cover min-h-screen" />
    </div>
    <div ref="spacerEl" class="w-full"></div>
  </section>
</template>
