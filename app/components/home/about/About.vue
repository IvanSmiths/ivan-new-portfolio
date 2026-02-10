<template>
  <div
    ref="containerRef"
    class="py-3xl flex w-full items-center justify-center"
  >
    <div class="max-sm:px-sm flex w-full items-center justify-center md:w-8/12">
      <AnimatedTextWithImages
        :images="animatedImages"
        :trigger-ref="containerRef"
        :words="animatedWords"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AnimatedTextWithImages from "~/components/home/about/AnimatedTextWithImages.vue";
import {
  animatedImages,
  animatedWords,
} from "~~/utils/data/home/textAndImages";

const containerRef = ref<HTMLElement | null>(null);
</script>

<style scoped></style>
