<script lang="ts" setup>
import type { WorkProjectPage } from "~/domain/works/types";

const props = defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <div class="w-full">
    <div class="flex h-full w-full flex-col gap-5">
      <template v-for="(imagees, index) in work.images" :key="index">
        <img
          v-if="imagees.layout === 'single'"
          :alt="`${work.name} image ${index + 1}`"
          :src="imagees.src"
          class="aspect-video w-full object-cover"
        />

        <div v-else-if="imagees.layout === 'row'" class="flex flex-col gap-5 md:flex-row">
          <img
            v-for="(src, i) in imagees.src"
            :key="src"
            :alt="`${work.name} image ${index + 1}-${i + 1}`"
            :src="src"
            class="aspect-video w-full object-cover md:w-1/2"
          />
        </div>
      </template>
    </div>
  </div>
</template>
