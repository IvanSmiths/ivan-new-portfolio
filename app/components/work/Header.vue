<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { useCurtainTransition } from "~/composables/animations/useCurtainTransition";
import type { WorkProjectPage } from "~/domain/works/types";

const { phase } = useCurtainTransition();

const props = defineProps<{
  work: WorkProjectPage;
}>();

const containerRef = ref<HTMLElement | null>(null);
const labelRefs = ref<HTMLElement[]>([]);
const overlayRef = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.set(labelRefs.value, { autoAlpha: 0, y: 8 });
  gsap.set(overlayRef.value, { autoAlpha: 0 });

  gsap.to(overlayRef.value, {
    autoAlpha: 1,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(labelRefs.value, {
    autoAlpha: 1,
    y: 0,
    duration: 0.28,
    stagger: 0.06,
    ease: "power2.out",
    delay: 0.2,
  });
});
</script>

<template>
  <div
    ref="containerRef"
    :class="['covering', 'covered'].includes(phase) ? 'z-0' : 'z-20'"
    class="relative w-full h-full"
  >
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-1 z-10"
    >
      <h1
        :ref="(el) => el && labelRefs.push(el as HTMLElement)"
        class="mix-blend-difference text-foreground uppercase text-xs"
      >
        {{ work.role }}
      </h1>
      <h2
        :ref="(el) => el && labelRefs.push(el as HTMLElement)"
        class="mix-blend-difference text-foreground uppercase text-xs"
      >
        {{ work.name }}
      </h2>
    </div>

    <div ref="overlayRef" class="absolute inset-0 z-[5] bg-black/50 pointer-events-none" />

    <img :src="work?.homeImage.url" alt="" class="h-full w-full object-cover" />
  </div>
</template>

<style scoped></style>
