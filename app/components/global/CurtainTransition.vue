<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { usePageLayerTransition } from "~/composables/animations/global/usePageLayerTransition";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";

const { $gsap } = useNuxtApp();

const props = defineProps<{
  pageEl?: HTMLElement | null;
}>();

const curtainEl = ref<HTMLDivElement | null>(null);
const blurEl = ref<HTMLDivElement | null>(null);
const timeline = ref<gsap.core.Timeline | null>(null);

const route = useRoute();
const { $ScrollTrigger } = useNuxtApp();
const { active, phase, notifyCovered, notifyRevealed } = useCurtainTransition();
const { addCoverMotion, addRevealMotion, clear, kill } = usePageLayerTransition();
const isActive = computed(() => active.value);
let restoreScrollLock: (() => void) | null = null;

function preventScrollInput(event: Event) {
  event.preventDefault();
  event.stopPropagation();
}

function lockScroll() {
  if (!import.meta.client || restoreScrollLock) return;

  const html = document.documentElement;
  const body = document.body;
  const htmlOverflow = html.style.overflow;
  const htmlOverscroll = html.style.overscrollBehavior;
  const bodyOverflow = body.style.overflow;
  const bodyOverscroll = body.style.overscrollBehavior;

  html.style.overflow = "hidden";
  html.style.overscrollBehavior = "none";
  body.style.overflow = "hidden";
  body.style.overscrollBehavior = "none";
  html.dataset.curtainScrollLocked = "true";

  window.addEventListener("wheel", preventScrollInput, { passive: false, capture: true });

  restoreScrollLock = () => {
    window.removeEventListener("wheel", preventScrollInput, { capture: true });

    html.style.overflow = htmlOverflow;
    html.style.overscrollBehavior = htmlOverscroll;
    body.style.overflow = bodyOverflow;
    body.style.overscrollBehavior = bodyOverscroll;
    delete html.dataset.curtainScrollLocked;
    restoreScrollLock = null;
  };
}

function unlockScroll() {
  restoreScrollLock?.();
}

function killTimeline() {
  timeline.value?.kill();
  timeline.value = null;
  kill(props.pageEl);
}

function setInitialHidden() {
  if (!curtainEl.value || !blurEl.value) return;
  $gsap.set(curtainEl.value, { yPercent: 100 });
  $gsap.set(blurEl.value, { opacity: 0, backdropFilter: "blur(0px)" });
}

function shouldAnimatePageReveal() {
  const pageRevealMotion = route.meta?.pageRevealMotion;
  if (typeof pageRevealMotion === "boolean") {
    return pageRevealMotion;
  }

  return true;
}

async function playCover() {
  await nextTick();
  if (!curtainEl.value || !blurEl.value) return;

  killTimeline();
  $gsap.set(curtainEl.value, { yPercent: 100 });
  $gsap.set(blurEl.value, { opacity: 0, backdropFilter: "blur(0px)" });

  const nextTimeline = $gsap
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

  addCoverMotion(nextTimeline, props.pageEl);
  timeline.value = nextTimeline;
}

async function playReveal() {
  await nextTick();
  if (!curtainEl.value || !blurEl.value) return;

  killTimeline();

  const nextTimeline = $gsap
    .timeline({
      delay: 0.15,
      onComplete: () => {
        $gsap.set(curtainEl.value, { yPercent: 100 });
        $gsap.set(blurEl.value, { opacity: 0, backdropFilter: "blur(0px)" });
        clear(props.pageEl);
        $ScrollTrigger.refresh();
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

  addRevealMotion(nextTimeline, props.pageEl, {
    shouldAnimate: shouldAnimatePageReveal(),
  });

  timeline.value = nextTimeline;
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
    if (a) {
      lockScroll();
      return;
    }

    unlockScroll();
    setInitialHidden();
  },
  { immediate: true },
);

onMounted(setInitialHidden);
onBeforeUnmount(() => {
  killTimeline();
  unlockScroll();
});
</script>

<template>
  <div ref="blurEl" class="pointer-events-none fixed inset-0 z-9" style="opacity: 0" />
  <div
    ref="curtainEl"
    :class="isActive ? 'pointer-events-auto' : 'pointer-events-none'"
    class="bg-foreground fixed inset-0 z-10"
  />
</template>
