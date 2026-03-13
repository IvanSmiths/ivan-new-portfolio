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
const NAVBAR_SELECTOR = "[data-page-transition-navbar]";

const route = useRoute();
const { $ScrollTrigger } = useNuxtApp();
const { active, destinationRouteLabel, phase, notifyCovered, notifyRevealed } =
  useCurtainTransition();
const { addCoverMotion, addRevealMotion, clear, kill } = usePageLayerTransition();
const isActive = computed(() => active.value);
const isLabelVisible = computed(() => phase.value === "covering" || phase.value === "covered");
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

function getNavbarEl() {
  if (!import.meta.client) return null;
  return document.querySelector<HTMLElement>(NAVBAR_SELECTOR);
}

function killTimeline() {
  timeline.value?.kill();
  timeline.value = null;
  kill(props.pageEl);
  kill(getNavbarEl());
}

function setInitialHidden() {
  if (!curtainEl.value || !blurEl.value) return;
  $gsap.set(curtainEl.value, {
    yPercent: 100,
    opacity: 0,
    willChange: "transform,opacity",
    force3D: true,
  });
  $gsap.set(blurEl.value, { opacity: 0, willChange: "opacity", force3D: true });
  clear(getNavbarEl(), { withBlur: true });
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
  const navbarEl = getNavbarEl();

  killTimeline();
  $gsap.set(curtainEl.value, { yPercent: 100, opacity: 1 });
  $gsap.set(blurEl.value, { opacity: 0 });

  const nextTimeline = $gsap
    .timeline({ onComplete: notifyCovered })
    .to(
      blurEl.value,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power1.in",
      },
      0,
    )
    .to(
      curtainEl.value,
      {
        yPercent: 0,
        duration: 1.2,
        ease: "expo.inOut",
      },
      "<",
    );

  addCoverMotion(nextTimeline, props.pageEl);
  addCoverMotion(nextTimeline, navbarEl, { withBlur: true });
  timeline.value = nextTimeline;
}

async function playReveal() {
  await nextTick();
  if (!curtainEl.value || !blurEl.value) return;
  const navbarEl = getNavbarEl();

  killTimeline();
  $gsap.set(curtainEl.value, { opacity: 1 });

  const nextTimeline = $gsap
    .timeline({
      delay: 0.15,
      onComplete: () => {
        $gsap.set(curtainEl.value, { yPercent: 100, opacity: 0 });
        $gsap.set(blurEl.value, { opacity: 0 });
        clear(props.pageEl);
        clear(navbarEl, { withBlur: true });
        $ScrollTrigger.refresh();
        notifyRevealed();
      },
    })
    .to(curtainEl.value, {
      yPercent: -100,
      duration: 1.2,
      ease: "expo.inOut",
    })
    .to(
      blurEl.value,
      {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
      },
      "-=0.3",
    );

  addRevealMotion(nextTimeline, props.pageEl, {
    shouldAnimate: shouldAnimatePageReveal(),
  });
  addRevealMotion(nextTimeline, navbarEl, {
    shouldAnimate: shouldAnimatePageReveal(),
    withBlur: true,
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
  <div
    ref="blurEl"
    class="pointer-events-none fixed inset-0 z-9"
    style="
      opacity: 0;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      transform: translateZ(0);
    "
  />
  <div
    ref="curtainEl"
    :class="isActive ? 'pointer-events-auto' : 'pointer-events-none'"
    class="bg-foreground fixed inset-0 z-10 flex items-center justify-center"
    style="opacity: 0; transform: translateZ(0)"
  >
    <span
      :class="isLabelVisible ? 'opacity-100' : 'opacity-0'"
      class="text-background pointer-events-none font-serif text-2xl font-light tracking-[0.08em] italic transition-opacity duration-300 ease-out select-none"
    >
      {{ destinationRouteLabel }}
    </span>
  </div>
</template>
