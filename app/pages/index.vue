<script lang="ts" setup>
import { useHorizontalScroll } from "~/composables/useHorizontalScroll";

const containerRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);

useHorizontalScroll(containerRef, triggerRef);
</script>

<template>
  <NuxtLink class="fixed top-0 left-0 z-50" to="/about">about</NuxtLink>
  <h1 class="text-xl">home</h1>

  <div class="hidden sm:block">
    <div ref="triggerRef" class="h-screen w-full overflow-hidden pt-10">
      <div ref="containerRef" class="relative flex h-full w-fit items-center">
       <h1 class="text-9xl">TEXTTRTVYVHGVVJJHBJBHVHGVHVHVHVVHGV</h1>
      </div>
    </div>
  </div>
  <footer class="text-9xl">FOOTER</footer>
</template>

<style scoped>

</style>