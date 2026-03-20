<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import { useParagraphReveal } from "~/composables/animations/home/useParagraphReveal";
import Weather from "~/components/home/description/Weather.vue";
import Time from "~/components/home/description/Time.vue";
import Logo4 from "~/components/home/description/Logo4.vue";

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
  <div class="gap-md pt-md px-md fixed top-0 grid grid-cols-8 flex-col items-end sm:grid-cols-12">
    <p class="pointer-events-auto invisible fixed">
      If you're looking for a website creation agency in Ragusa that delivers world-class results,
      you've come to the right place. I combine full-stack development (over 5 years of experience
      with Adidas and Commerzbank) with advanced marketing strategies. As an integrated digital
      agency, I don't just create a website; I build your online sales infrastructure: social media
      integration, data tracking, and search engine positioning. Entrust your business with a
      unique, fast, and optimized website that generates new customers every day.
    </p>
    <div class="col-span-full">
      <Logo4 />
    </div>
    <div ref="paragraphRef" class="col-span-full flex w-full flex-col md:col-start-1 md:col-end-4">
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
