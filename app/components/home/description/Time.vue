<script lang="ts" setup>
import { ref } from "vue";
import { useLiveTime } from "~/composables/useLiveTime";

const timeRef = ref<HTMLElement | null>(null);

const { currentTime } = useLiveTime({
  locale: "it-IT",
  timeZone: "Europe/Rome",
  intervalMs: 1000,
  format: {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short",
    year: "numeric",
  },
});
</script>

<template>
  <span ref="timeRef">
    {{ currentTime }}
  </span>
</template>
