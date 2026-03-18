<script lang="ts" setup>
const { $gsap } = useNuxtApp();

const dotEl = ref<HTMLDivElement | null>(null);
const mouse = reactive({ x: 0, y: 0 });
let isMoving = false;
let tickerCallback: (() => void) | null = null;

const isDesktopViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

const onMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  isMoving = true;
};

onMounted(() => {
  if (!isDesktopViewport()) return;

  window.addEventListener("mousemove", onMove, { passive: true });

  const quickX = $gsap.quickTo(dotEl.value, "x", { duration: 0.18, ease: "power3.out" });
  const quickY = $gsap.quickTo(dotEl.value, "y", { duration: 0.18, ease: "power3.out" });

  tickerCallback = () => {
    if (!dotEl.value) return;
    if (!isMoving) return;

    quickX(mouse.x + 2);
    quickY(mouse.y - dotEl.value.offsetHeight);
  };
  $gsap.ticker.add(tickerCallback);

  if (dotEl.value) {
    $gsap.set(dotEl.value, { x: -999, y: -999 });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMove);
  if (tickerCallback) {
    $gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
});
</script>

<template>
  <div
    ref="dotEl"
    aria-hidden="true"
    class="bg-foreground pointer-events-none fixed top-0 left-0 z-9999 hidden h-2.5 w-2.5 origin-bottom-left items-center justify-center overflow-hidden rounded-2xl backdrop-blur will-change-transform lg:flex"
  />
</template>
