<script lang="ts" setup>
import { useCurtainTransition } from "~/composables/animations/useCurtainTransition";
import type { WorkProjectPage } from "~/domain/works/types";

const { phase } = useCurtainTransition();

const props = defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <div
    :class="['covering', 'covered'].includes(phase) ? 'z-0' : 'z-20'"
    class="relative top-0 left-0 w-full h-full"
  >
    <img :src="work?.homeImage.url" alt="" class="h-full w-full object-cover" />
  </div>
</template>

<style scoped></style>
