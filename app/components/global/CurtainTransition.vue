<script lang="ts" setup>
import { gsap } from "gsap";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useCurtainTransition } from "~/composables/animations/useCurtainTransition";

const curtainEl = ref<HTMLDivElement | null>(null);
const blurEl = ref<HTMLDivElement | null>(null);
const timeline = ref<gsap.core.Timeline | null>(null);

const { active, phase, notifyCovered, notifyRevealed } = useCurtainTransition();
const isActive = computed(() => active.value);

function killTimeline() {
  timeline.value?.kill();
  timeline.value = null;
}

function setInitialHidden() {
  if (!curtainEl.value || !blurEl.value) return;
  gsap.set(curtainEl.value, { yPercent: 100 });
  gsap.set(blurEl.value, { opacity: 0, backdropFilter: "blur(0px)" });
}

async function playCover() {
  await nextTick();
  if (!curtainEl.value || !blurEl.value) return;

  killTimeline();
  gsap.set(curtainEl.value, { yPercent: 100 });
  gsap.set(blurEl.value, { opacity: 0, backdropFilter: "blur(0px)" });

  timeline.value = gsap
    .timeline({ onComplete: notifyCovered })
    .to(
      blurEl.value,
      {
        opacity: 1,
        backdropFilter: "blur(6px)",
        duration: 0.3,
        ease: "power1.in",
      },
      0,
    )
    .to(
      curtainEl.value,
      {
        yPercent: 60,
        duration: 0.3,
        ease: "power1.in",
      },
      0,
    )
    .to(curtainEl.value, {
      yPercent: 10,
      duration: 0.25,
      ease: "none",
    })
    .to(curtainEl.value, {
      yPercent: 0,
      duration: 0.3,
      ease: "power2.out",
    });
}

async function playReveal() {
  await nextTick();
  if (!curtainEl.value || !blurEl.value) return;

  killTimeline();

  timeline.value = gsap
    .timeline({
      delay: 0.15,
      onComplete: () => {
        gsap.set(curtainEl.value, { yPercent: 100 });
        gsap.set(blurEl.value, { opacity: 0, backdropFilter: "blur(0px)" });
        notifyRevealed();
      },
    })
    .to(
      curtainEl.value,
      {
        yPercent: -30,
        duration: 0.3,
        ease: "power1.in",
      },
      0,
    )
    .to(curtainEl.value, {
      yPercent: -80,
      duration: 0.25,
      ease: "none",
    })
    .to(curtainEl.value, {
      yPercent: -100,
      duration: 0.3,
      ease: "power2.out",
    })
    .to(
      blurEl.value,
      {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.1,
        ease: "power2.out",
      },
      "-=0.25",
    );
}

watch(
  phase,
  (p) => {
    if (p === "covering") void playCover();
    if (p === "revealing") void playReveal();
  },
  { immediate: true },
);

watch(
  isActive,
  (a) => {
    if (!a) setInitialHidden();
  },
  { immediate: true },
);

onMounted(setInitialHidden);
onBeforeUnmount(killTimeline);
</script>

<template>
  <div ref="blurEl" class="fixed inset-0 z-9 pointer-events-none" style="opacity: 0" />
  <div
    ref="curtainEl"
    :class="isActive ? 'pointer-events-auto' : 'pointer-events-none'"
    class="fixed inset-0 z-10 bg-foreground"
  />
</template>
