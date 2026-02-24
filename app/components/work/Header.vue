<script lang="ts" setup>
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";
import { useWorkHeaderAnimation } from "~/composables/animations/work/useWorkHeaderAnimation";
import type { WorkProjectPage } from "~/domain/works/types";

const { phase } = useCurtainTransition();

defineProps<{
  work: WorkProjectPage;
}>();

const { rootRef, imageWrapRef, titleRef, roleRef, metaBarRef, spacerRef } =
  useWorkHeaderAnimation();
</script>

<template>
  <section
    ref="rootRef"
    :class="['covering', 'covered'].includes(phase) ? 'z-0' : 'z-20'"
    class="relative"
  >
    <div class="absolute top-48 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center">
      <div class="flex flex-col items-center text-center">
        <h1 ref="titleRef" class="text-4xl font-medium uppercase md:text-9xl">
          {{ work?.name }}
        </h1>
        <p ref="roleRef" class="mt-5 font-serif text-lg italic md:text-4xl">[{{ work?.role }}]</p>
      </div>
    </div>

    <div class="absolute top-160 left-1/2 z-10 w-[60%] -translate-x-1/2 uppercase">
      <div ref="metaBarRef" class="flex items-center justify-between text-sm md:text-base">
        <span>{{ "01" }}-{{ "04" }}</span>
        <span>{{ work?.date }}</span>
      </div>
    </div>

    <div ref="imageWrapRef" class="relative z-20 will-change-transform">
      <img :src="work?.homeImage.url" alt="" class="min-h-screen w-full origin-top object-cover" />
    </div>
    <div ref="spacerRef" class="w-full" />
  </section>
</template>
