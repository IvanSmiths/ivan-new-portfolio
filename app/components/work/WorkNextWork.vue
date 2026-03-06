<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import { useNextWork } from "~/composables/animations/work/useNextWork";

const router = useRouter();

const props = defineProps<{ currentSlug: string }>();

const nextSlug = computed(() => {
  const index = orderedSlugs.indexOf(props.currentSlug as (typeof orderedSlugs)[number]);
  return orderedSlugs[(index === -1 ? 0 : index + 1) % orderedSlugs.length] as string;
});

const nextWork = computed<WorkProjectPage | undefined>(() => {
  return worksBySlug[String(nextSlug.value)];
});

const { nextWorkContainerRef, progressFillRef, imageContainerRef, imageRef } = useNextWork({
  onDone: () => router.push(nextSlug.value),
});
</script>

<template>
  <section
    ref="nextWorkContainerRef"
    class="gap-md relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-hidden"
  >
    <div class="flex flex-col items-center pb-36 text-center">
      <h1 class="text-4xl font-medium uppercase md:text-9xl">Next Work</h1>
      <p class="mt-5 font-serif text-base italic md:text-5xl">[Scroll...]</p>
      <div class="bg-foreground/20 mt-6 h-0.5 w-56 overflow-hidden rounded-full md:w-96">
        <div
          ref="progressFillRef"
          class="bg-foreground h-full w-full rounded-full"
          style="transform: scaleX(0)"
        />
      </div>

      <div
        ref="imageContainerRef"
        class="absolute right-0 -bottom-72 left-0 z-10 mx-auto w-170 overflow-hidden"
      >
        <img
          v-if="nextWork"
          ref="imageRef"
          :alt="`${nextWork.name} preview`"
          :src="nextWork.homeImage.url"
          class="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  </section>
</template>
