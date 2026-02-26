<script lang="ts" setup>
import type { WorkProjectPage } from "~/domain/works/types";

const props = defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <div class="w-full">
    <div class="flex h-full w-full flex-col gap-5">
      <img
        v-for="(image, index) in work.images"
        :key="image"
        :alt="`${work.name} image ${index + 1}`"
        :src="image"
        class="aspect-video h-fit w-96 object-cover"
      />
    </div>
  </div>
</template>
