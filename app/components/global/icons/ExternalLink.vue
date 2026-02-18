<template>
  <svg
    :height="size"
    :width="size"
    class="stroke-foreground group-hover:stroke-background hidden fill-none transition md:block"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title id="icon-title">Arrow up</title>
    <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
    <path d="m21 3-9 9" />
    <path d="M15 3h6v6" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  dimensions?: number;
}>();

const size = computed(() => props.dimensions ?? 12);
</script>
