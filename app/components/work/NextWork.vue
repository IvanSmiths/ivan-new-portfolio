<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import { useNextWorkAnimation } from "~/composables/animations/work/useNextWorkAnimation";

const router = useRouter();

const props = defineProps<{ currentSlug: string }>();

const nextSlug = computed(() => {
  const index = orderedSlugs.indexOf(props.currentSlug as (typeof orderedSlugs)[number]);
  return orderedSlugs[(index === -1 ? 0 : index + 1) % orderedSlugs.length] as string;
});

const nextWork = computed<WorkProjectPage | undefined>(() => {
  return worksBySlug[String(nextSlug.value)];
});

const { nextWorkContainerRef, progressFillRef, imageContainerRef, imageRef } = useNextWorkAnimation(
  {
    onDone: () => router.push(nextSlug.value),
  },
);
</script>

<template>
  <section
    ref="nextWorkContainerRef"
    class="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 overflow-y-hidden"
  >
    <div class="flex flex-col items-center pb-36 text-center">
      <h1 class="text-4xl font-medium uppercase md:text-9xl">Next Work</h1>
      <p class="mt-3 text-base md:text-2xl">[Scroll...]</p>
      <NuxtLink :to="nextSlug">Next Work</NuxtLink>
      <div class="bg-foreground/20 mt-6 h-0.5 w-56 overflow-hidden rounded-full md:w-96">
        <div
          ref="progressFillRef"
          class="bg-foreground h-full w-full rounded-full"
          style="transform: scaleX(0)"
        />
      </div>

      <div ref="imageContainerRef" class="absolute -bottom-72 z-10 w-170 overflow-hidden">
        <img
          v-if="nextWork"
          ref="imageRef"
          :alt="`${nextWork.name} preview`"
          :src="nextWork.homeImage.url"
          class="h-full w-full scale-200 object-cover object-top"
        />
      </div>
    </div>
  </section>
</template>
