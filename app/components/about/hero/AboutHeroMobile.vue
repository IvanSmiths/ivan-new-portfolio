<script lang="ts" setup>
import { nextTick, onMounted, onScopeDispose, ref } from "vue";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";

const { $gsap, $ScrollTrigger } = useNuxtApp();
const { prepareSplitReveal } = useSplitTextAnimation();

const rootRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;
let titleReveal: ReturnType<typeof prepareSplitReveal> | null = null;

function cleanup() {
  ctx?.revert();
  titleReveal?.revert();
  ctx = null;
  titleReveal = null;
}

onMounted(async () => {
  await nextTick();

  if (!rootRef.value || !titleRef.value) return;

  cleanup();

  ctx = $gsap.context(() => {
    titleReveal = prepareSplitReveal(titleRef.value, {
      splitBy: "words",
      duration: 0.9,
      stagger: 0.018,
      yPercent: 110,
    });

    const tl = $gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: rootRef.value,
        start: "top 85%",
        once: true,
      },
    });

    titleReveal.addToTimeline(tl);
  }, rootRef.value);

  $ScrollTrigger.refresh();
});

onScopeDispose(() => {
  cleanup();
});
</script>

<template>
  <div ref="rootRef" class="flex min-h-screen w-full flex-col justify-center gap-6 py-20 xl:hidden">
    <span class="text-foreground block text-xs">Yeah.</span>
    <h1 ref="titleRef" class="text-foreground text-7xl leading-none font-black uppercase">
      Code wizard with an eye for design
    </h1>
    <p class="text-foreground max-w-md text-base leading-relaxed">
      tesv tasvdtsa dsa gsb js dsbdj bs jksd ksd hs h dsdnksnk sd n jsdsjksjds sdj djs dsj.
    </p>
    <img alt="" class="w-full max-w-sm object-contain" src="/me.png" />
  </div>
</template>

<style scoped></style>
