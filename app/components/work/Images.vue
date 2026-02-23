<script lang="ts" setup>
import { computed } from "vue";
import type { WorkProjectPage } from "~/domain/works/types";

const props = defineProps<{
  work: WorkProjectPage;
  showCover?: boolean;
  skipFirstGalleryImage?: boolean;
}>();

const coverSrc = computed(() => props.work.homeImage?.url ?? "");
const galleryImages = computed(() => {
  const imgs = props.work.images ?? [];
  return props.skipFirstGalleryImage ? imgs.slice(1) : imgs;
});

const hasManyImages = computed(() => (props.work.images?.length ?? 0) > 1);
</script>

<template>
  <div class="w-full">
    <div v-if="showCover" class="relative top-0 left-0 h-full w-full">
      <img :src="coverSrc" alt="" class="h-full w-full object-cover" />
    </div>

    <div v-if="hasManyImages" class="flex h-full w-full flex-col gap-5">
      <img
        v-for="(image, index) in galleryImages"
        :key="image"
        :alt="`${work.name} image ${skipFirstGalleryImage ? index + 2 : index + 1}`"
        :src="image"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  </div>
</template>
