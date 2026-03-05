<script lang="ts" setup>
import { useHeaderAnimation } from "~/composables/animations/work/useHeaderAnimation";
import type { WorkProjectPage } from "~/domain/works/types";
import AppGrid from "~/components/global/grid/AppGrid.vue";

const props = defineProps<{
  currentIndex: number;
  totalWorks: number;
  work: WorkProjectPage;
}>();

const { rootRef, titleRef, roleRef, metaBarRef } = useHeaderAnimation();
</script>

<template>
  <AppGrid>
    <section ref="rootRef" class="pb-xl bg-background relative col-span-full">
      <div class="bg-background min-h-screen">
        <div class="z-10 flex h-[70dvh] items-center justify-center">
          <div class="flex flex-col items-center text-center">
            <div class="overflow-hidden leading-none">
              <h1 ref="titleRef" class="text-5xl font-black uppercase lg:text-6xl xl:text-9xl">
                {{ work?.name }}
              </h1>
            </div>

            <div class="mt-5 overflow-hidden leading-[1.1]">
              <p ref="roleRef" class="font-serif text-lg font-light italic lg:text-5xl">
                [{{ work?.role }}]
              </p>
            </div>
          </div>
        </div>

        <div
          class="absolute top-[66dvh] left-1/2 z-10 w-full -translate-x-1/2 overflow-hidden px-10 uppercase lg:px-48"
        >
          <div>
            <div ref="metaBarRef" class="flex items-center justify-between text-sm lg:text-base">
              <span
                >{{ String(props.currentIndex + 1).padStart(2, "0") }}-{{
                  String(totalWorks).padStart(2, "0")
                }}</span
              >
              <span>{{ work?.date }}</span>
            </div>
          </div>
        </div>

        <div>
          <img
            :src="work?.homeImage.url"
            alt=""
            class="min-h-screen w-full origin-top object-cover object-top"
          />
        </div>
      </div>
    </section>
  </AppGrid>
</template>
