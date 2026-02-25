<script lang="ts" setup>
import { experiments } from "~/domain/lab/experiments";
</script>

<template>
  <div class="flex justify-start gap-5">
    <div v-for="experiment in experiments" :key="experiment.title" class="overflow-hidden">
      <img
        :alt="experiment.title"
        :class="[
          'h-45 object-cover',
          experiment.aspectRatio === 'portrait' ? 'aspect-3/4 w-40' : 'aspect-video w-64',
        ]"
        :src="experiment.image"
      />
    </div>
  </div>
</template>
