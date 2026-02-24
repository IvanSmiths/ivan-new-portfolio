<script lang="ts" setup>
import type { Ref } from "vue";
import { worksCards } from "~/domain/works";
import { useWorksLoaderAnimation } from "~/composables/animations/home/useWorksLoaderAnimation";

const props = defineProps<{
  targetImageRefs: Ref<HTMLElement[]>;
}>();

const emit = defineEmits<{ done: [] }>();

const { loaderRef, cardRefs, isVisible, isLoading } = useWorksLoaderAnimation(
  () => emit("done"),
  props.targetImageRefs,
);
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" ref="loaderRef" class="bg-background fixed inset-0 z-40">
      <div aria-hidden="true" class="pointer-events-auto fixed inset-0 z-40" />

      <Transition name="fade">
        <span
          v-if="isLoading"
          class="text-foreground pointer-events-none absolute inset-0 z-50 flex items-center justify-center font-serif text-lg tracking-widest uppercase italic"
        >
          [Loading...]
        </span>
      </Transition>

      <div
        v-for="(work, idx) in worksCards"
        :key="idx"
        :ref="
          (el) => {
            if (el) cardRefs[idx] = el as HTMLElement;
          }
        "
        class="loader-thumb absolute z-50 overflow-hidden"
        style="opacity: 0; width: 28px; height: 44px"
      >
        <img
          :alt="work.title"
          :src="work.image"
          class="pointer-events-none h-full w-full object-cover object-top"
          draggable="false"
        />
      </div>
    </div>
  </Teleport>
</template>
