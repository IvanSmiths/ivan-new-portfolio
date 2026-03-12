<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import { useParagraphReveal } from "~/composables/animations/home/useParagraphReveal";
import Weather from "~/components/home/description/Weather.vue";
import Time from "~/components/home/description/Time.vue";
import Logo3 from "~/components/home/description/Logo3.vue";

const paragraphRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const cityRef = ref<HTMLElement | null>(null);
const weatherRef = ref<HTMLElement | null>(null);
const timeRef = ref<HTMLElement | null>(null);

const paragraphRevealAnimation = useParagraphReveal({
  rootRef: paragraphRef,
  titleRef,
  cityRef,
  weatherRef,
  timeRef,
});

onMounted(async () => {
  await nextTick();
  paragraphRevealAnimation.init();
});
</script>

<template>
  <div
    class="gap-md pt-md px-md fixed top-0 z-50 grid grid-cols-8 flex-col items-end sm:grid-cols-16"
  >
    <div class="col-span-full">
      <Logo3 />
    </div>
    <div ref="paragraphRef" class="col-span-full flex w-full flex-col md:col-start-1 md:col-end-5">
      <div class="overflow-hidden">
        <h1 ref="titleRef" class="text-foreground 3xl:text-2xl text-base">
          <strong class="font-normal"> Fullstack developer, 5 years in the field️. </strong>
          Transforming wild ideas into pixel-perfect realities.
        </h1>
      </div>
      <div class="text-foreground-muted 3xl:text-xl gap-sm mt-sm flex text-xs">
        <div class="overflow-hidden">
          <span ref="cityRef"> Wiesbaden (DE)</span>
        </div>
        <div ref="weatherRef" class="flex gap-1 overflow-hidden">
          <Weather />
        </div>
        <div ref="timeRef" class="overflow-hidden">
          <Time />
        </div>
      </div>
    </div>
  </div>
</template>
