<script lang="ts" setup>
import { worksCards } from "~/domain/works";
import { useWorksLoaderAnimation } from "~/composables/animations/home/useWorksLoaderAnimation";

const emit = defineEmits<{ done: [] }>();

const { loaderRef, itemRefs, isVisible } = useWorksLoaderAnimation(() => emit("done"));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      ref="loaderRef"
      class="bg-background pointer-events-none fixed inset-0 z-40"
    >
      <div
        v-for="(work, idx) in worksCards"
        :key="idx"
        :ref="
          (el) => {
            if (el) itemRefs[idx] = el as HTMLElement;
          }
        "
        class="loader-thumb absolute overflow-hidden"
        style="opacity: 0; width: 28px; height: 44px"
      >
        <img
          :alt="work.title"
          :src="work.image"
          class="h-full w-full object-cover object-top"
          draggable="false"
        />
      </div>
    </div>
  </Teleport>
</template>
