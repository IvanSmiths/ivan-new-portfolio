<script lang="ts" setup>
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";
import { useWorkHeaderAnimation } from "~/composables/animations/work/useWorkHeaderAnimation";
import type { WorkProjectPage } from "~/domain/works/types";

const { phase } = useCurtainTransition();

const props = defineProps<{
  currentIndex: number;
  totalWorks: number;
  work: WorkProjectPage;
}>();

const { rootRef, imageWrapRef, titleRef, roleRef, metaBarRef, spacerRef } =
  useWorkHeaderAnimation();
</script>

<template>
  <section
    ref="rootRef"
    :class="['covering', 'covered'].includes(phase) ? 'z-0' : 'z-20'"
    class="relative pb-20"
  >
    <div
      class="absolute top-48 left-1/2 z-10 flex w-full -translate-x-1/2 items-center justify-center"
    >
      <div class="flex flex-col items-center text-center">
        <div class="overflow-hidden leading-none">
          <h1 ref="titleRef" class="text-5xl font-black uppercase md:text-[8.5rem]">
            {{ work?.name }}
          </h1>
        </div>

        <div class="mt-5 overflow-hidden leading-[1.1]">
          <p ref="roleRef" class="font-serif text-lg font-light italic md:text-5xl">
            [{{ work?.role }}]
          </p>
        </div>
      </div>
    </div>

    <div
      class="absolute top-100 left-1/2 z-10 w-full -translate-x-1/2 px-10 uppercase lg:px-48 xl:top-160"
    >
      <div class="overflow-hidden">
        <div ref="metaBarRef" class="flex items-center justify-between text-sm md:text-base">
          <span
            >{{ String(props.currentIndex + 1).padStart(2, "0") }}-{{
              String(totalWorks).padStart(2, "0")
            }}</span
          >
          <span>{{ work?.date }}</span>
        </div>
      </div>
    </div>

    <div ref="imageWrapRef" class="relative z-20 will-change-transform">
      <img :src="work?.homeImage.url" alt="" class="min-h-screen w-full origin-top object-cover" />
    </div>
    <div ref="spacerRef" class="w-full" />
  </section>
</template>
