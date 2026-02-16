<script lang="ts" setup>
type WeatherUi = { temp: number; condition: string };

const { data } = await useFetch<WeatherUi>("/api/weather", {
  query: { city: "Wiesbaden" },
  server: true,
  lazy: true,
});

const temperature = computed(() => data.value?.temp);
const condition = computed(() => data.value?.condition);
</script>

<template>
  <div v-if="temperature != null && condition" class="flex gap-0.5">
    <span class="text-foreground-muted text-xs">{{ temperature }}°</span>
    <span class="text-foreground-muted text-xs">{{ condition }}</span>
  </div>
</template>
