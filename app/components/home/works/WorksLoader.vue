<script lang="ts" setup>
import type { Ref } from "vue";
import { worksCards } from "~/domain/works";
import { splitTextForRender } from "~/composables/animations/global/useSplitAnimation";
import { useWorksLoaderAnimation } from "~/composables/animations/home/useWorksLoaderAnimation";

const props = defineProps<{
  targetImageRefs?: Ref<HTMLElement[]>;
}>();

const emit = defineEmits<{ done: [] }>();

const { loaderRef, cardRefs, isVisible, isLoading } = useWorksLoaderAnimation(
  () => emit("done"),
  props.targetImageRefs,
);

const loadingChars = splitTextForRender("[Loading...]");
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      ref="loaderRef"
      class="works-loader-overlay bg-background fixed inset-0 z-40"
    >
      <div aria-hidden="true" class="pointer-events-auto fixed inset-0 z-40" />

      <Transition name="fade">
        <span
          v-if="isLoading"
          class="text-foreground pointer-events-none absolute inset-0 z-50 flex items-center justify-center gap-[0.06em] font-serif text-lg tracking-widest italic"
        >
          <span
            v-for="(char, idx) in loadingChars"
            :key="`${char}-${idx}`"
            :style="{ '--char-index': idx }"
            class="inline-block animate-pulse [animation-delay:calc(var(--char-index)*45ms)] [animation-duration:900ms]"
          >
            {{ char }}
          </span>
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
