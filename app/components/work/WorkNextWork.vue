<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { orderedSlugs, worksBySlug } from "~/domain/works";
import type { WorkProjectPage } from "~/domain/works/types";
import { useNextWork } from "~/composables/animations/work/useNextWork";

const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

const props = defineProps<{ currentSlug: string }>();

const nextSlug = computed(() => {
  const index = orderedSlugs.indexOf(props.currentSlug as (typeof orderedSlugs)[number]);
  return orderedSlugs[(index === -1 ? 0 : index + 1) % orderedSlugs.length] as string;
});

const nextWork = computed<WorkProjectPage | undefined>(() => {
  return worksBySlug[String(nextSlug.value)];
});

const { nextWorkContainerRef, progressFillRef, imageContainerRef, imageRef } = useNextWork({
  onDone: () => router.push(localePath(`/works/${nextSlug.value}`)),
});
</script>

<template>
  <section
    ref="nextWorkContainerRef"
    class="gap-md relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
  >
    <div class="flex flex-col items-center pb-36 text-center">
      <h3 class="pb-md text-base">{{ t("works.ui.nextWork") }}</h3>
      <h4 class="font-serif text-5xl italic md:text-7xl">{{ nextWork?.name }}</h4>
      <div class="bg-foreground/20 mt-6 h-0.5 w-56 overflow-hidden rounded-full md:w-96">
        <div
          ref="progressFillRef"
          class="bg-foreground h-full w-full rounded-full"
          style="transform: scaleX(0)"
        />
      </div>

      <div
        ref="imageContainerRef"
        class="absolute -bottom-56 left-1/2 z-10 w-170 -translate-x-1/2 overflow-hidden"
      >
        <img
          v-if="nextWork"
          ref="imageRef"
          :alt="t('works.ui.nextWorkImageAlt', { name: nextWork.name })"
          :src="nextWork.homeImage.url"
          class="work-cover-origin h-full"
        />
      </div>
    </div>
  </section>
</template>
