<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import { useHomeParagraphRevealAnimation } from "~/composables/animations/home/useHomeParagraphRevealAnimation";
import Weather from "~/components/home/description/Weather.vue";
import Time from "~/components/home/description/Time.vue";
import Logo2 from "~/components/home/description/Logo2.vue";

const paragraphRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const cityRef = ref<HTMLElement | null>(null);
const weatherRef = ref<HTMLElement | null>(null);
const timeRef = ref<HTMLElement | null>(null);

const paragraphRevealAnimation = useHomeParagraphRevealAnimation({
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
  <div class="flex flex-col items-end gap-5 px-5">
    <div
      ref="paragraphRef"
      class="flex w-full flex-col items-start md:flex-row md:items-end md:justify-between"
    >
      <div class="overflow-hidden">
        <h1 ref="titleRef" class="text-foreground 3xl:text-2xl 3xl:w-134 text-base md:w-96">
          <strong class="font-normal"> Fullstack developer, 5 years in the field️. </strong>
          Transforming wild ideas into pixel-perfect realities.
        </h1>
      </div>
      <div class="text-foreground-muted 3xl:text-xl mt-5 flex gap-2.5 text-xs">
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
    <div class="flex w-full">
      <Logo2 />
    </div>
  </div>
</template>
