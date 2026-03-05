<script lang="ts" setup>
import type { WorkProjectPage } from "~/domain/works/types";
import AppGrid from "~/components/global/grid/AppGrid.vue";

const props = defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <AppGrid as="section" class="w-full">
    <template v-for="(images, index) in work.images" :key="index">
      <div
        v-if="images.layout === 'single'"
        class="col-span-full w-full md:col-start-4 md:col-end-14"
      >
        <img
          :alt="`${work.name} image ${index + 1}`"
          :src="images.src"
          class="aspect-video w-full object-contain"
        />
      </div>
      <div
        v-else-if="images.layout === 'row'"
        class="gap-md col-span-full flex w-full flex-col justify-start md:col-start-4 md:col-end-14 md:flex-row"
      >
        <img
          v-for="(src, i) in images.src"
          :key="src"
          :alt="`${work.name} image ${index + 1}-${i + 1}`"
          :src="src"
          class="md:pr-md aspect-video w-full object-contain md:w-1/2"
        />
      </div>
    </template>
  </AppGrid>
</template>
