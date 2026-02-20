<script lang="ts" setup>
import { useCurtainTransition } from "~/composables/animations/useCurtainTransition";
import type { WorkProjectPage } from "~/domain/works/types";

const { phase } = useCurtainTransition();

const props = defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <div :class="['covering', 'covered'].includes(phase) ? 'z-0' : 'z-20'" class="relative">
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-1 z-10"
    ></div>
    <img :src="work?.homeImage.url" alt="" class="min-h-screen w-screen object-cover" />
  </div>
</template>

<style scoped></style>
