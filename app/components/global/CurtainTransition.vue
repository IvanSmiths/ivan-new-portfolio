<script lang="ts" setup>
import { gsap } from "gsap";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useCurtainTransition } from "~/composables/animations/useCurtainTransition";

const curtainEl = ref<HTMLDivElement | null>(null);
const tween = ref<gsap.core.Tween | null>(null);

const { active, phase, notifyCovered, notifyRevealed } = useCurtainTransition();

const isActive = computed(() => active.value);

function killTween() {
  tween.value?.kill();
  tween.value = null;
}

function setInitialHidden() {
  if (!curtainEl.value) return;
  gsap.set(curtainEl.value, {
    yPercent: 100,
  });
}

async function playCover() {
  await nextTick();
  if (!curtainEl.value) return;

  killTween();

  gsap.set(curtainEl.value, { yPercent: 100 });

  tween.value = gsap.to(curtainEl.value, {
    yPercent: 0,
    duration: 0.55,
    ease: "power3.inOut",
    onComplete: () => {
      notifyCovered();
    },
  });
}

async function playReveal() {
  await nextTick();
  if (!curtainEl.value) return;

  killTween();

  tween.value = gsap.to(curtainEl.value, {
    yPercent: -100,
    duration: 0.55,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.set(curtainEl.value, { yPercent: 100 });
      notifyRevealed();
    },
  });
}

watch(
  phase,
  (p) => {
    if (p === "covering") {
      void playCover();
      return;
    }

    if (p === "revealing") {
      void playReveal();
    }
  },
  { immediate: true },
);

watch(
  isActive,
  (a) => {
    if (!a) {
      setInitialHidden();
    }
  },
  { immediate: true },
);

onMounted(() => {
  setInitialHidden();
});

onBeforeUnmount(() => {
  killTween();
});
</script>

<template>
  <div
    ref="curtainEl"
    :class="isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    class="fixed inset-0 z-9999 bg-foreground transition-opacity"
  />
</template>
