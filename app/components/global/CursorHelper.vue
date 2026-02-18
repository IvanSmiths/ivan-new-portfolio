<script lang="ts" setup>
import gsap from "gsap";

const route = useRoute();
const { state } = useCursorHelper();

const dotEl = ref<HTMLDivElement | null>(null);
const iconEl = ref<HTMLImageElement | null>(null);

const isContactsRoute = computed(() => route.path === "/contacts");

const mouse = reactive({ x: 0, y: 0 });
let isMoving = false;
let idleTimer: number | null = null;

const setIdle = () => {
  if (!dotEl.value) return;
  gsap.to(dotEl.value, { scale: 1.15, duration: 0.35, yoyo: true, repeat: 1, ease: "power2.out" });
};

const scheduleIdle = () => {
  if (idleTimer) window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (state.value.mode === "default") setIdle();
  }, 1200);
};

const onMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  isMoving = true;
  scheduleIdle();
};

watch(
  () => state.value,
  (next) => {
    if (!dotEl.value) return;

    const shouldExpand = isContactsRoute.value && next.mode === "hover";

    if (shouldExpand) {
      gsap.to(dotEl.value, { width: 56, height: 56, duration: 0.22, ease: "power3.out" });
      if (iconEl.value) {
        gsap.to(iconEl.value, { opacity: 1, scale: 1, duration: 0.18, ease: "power3.out" });
      }
    } else {
      gsap.to(dotEl.value, { width: 10, height: 10, duration: 0.22, ease: "power3.out" });
      if (iconEl.value) {
        gsap.to(iconEl.value, { opacity: 0, scale: 0.85, duration: 0.12, ease: "power2.out" });
      }
    }
  },
  { deep: true },
);

onMounted(() => {
  window.addEventListener("mousemove", onMove, { passive: true });

  const quickX = gsap.quickTo(dotEl.value, "x", { duration: 0.18, ease: "power3.out" });
  const quickY = gsap.quickTo(dotEl.value, "y", { duration: 0.18, ease: "power3.out" });

  gsap.ticker.add(() => {
    if (!dotEl.value) return;
    if (!isMoving) return;

    quickX(mouse.x + 10);
    quickY(mouse.y - 5);
  });

  if (dotEl.value) {
    gsap.set(dotEl.value, { x: -999, y: -999 });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMove);
  if (idleTimer) window.clearTimeout(idleTimer);
});
</script>

<template>
  <div
    ref="dotEl"
    aria-hidden="true"
    class="pointer-events-none fixed left-0 top-0 z-9999 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground backdrop-blur will-change-transform"
    style="width: 10px; height: 10px"
  >
    <img
      ref="iconEl"
      :src="state.iconSrc || ''"
      alt=""
      class="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 opacity-0"
      draggable="false"
      style="transform: translate(-50%, -50%) scale(0.85)"
    />
  </div>
</template>
