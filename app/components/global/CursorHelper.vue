<script lang="ts" setup>
import gsap from "gsap";

const route = useRoute();
const { state, interactionBus } = useCursorHelper();

const dotEl = ref<HTMLDivElement | null>(null);
const iconEl = ref<HTMLImageElement | null>(null);
const scrollTextEl = ref<HTMLSpanElement | null>(null);

const isContactsRoute = computed(() => route.path === "/contacts");
const isScrollRoutes = computed(() => route.path === "/" || route.path.startsWith("/works/"));

const mouse = reactive({ x: 0, y: 0 });
let isMoving = false;
let idleTimer: number | null = null;
let scrollAppearTimer: number | null = null;
let scrollTextVisible = false;

const setIdle = () => {
  if (!dotEl.value) return;
  gsap.to(dotEl.value, { scale: 1.15, duration: 0.35, yoyo: true, repeat: 1, ease: "power2.out" });
};

const scheduleIdle = () => {
  if (idleTimer) window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    if (state.value.mode === "default") setIdle();
  }, 3000);
};

const showScrollText = () => {
  if (!scrollTextEl.value || !dotEl.value || scrollTextVisible) return;
  scrollTextVisible = true;

  gsap.to(dotEl.value, {
    width: 72,
    height: 28,
    borderRadius: 0,
    duration: 0.45,
    ease: "back.out(1.4)",
  });

  gsap.fromTo(
    scrollTextEl.value,
    { opacity: 0, letterSpacing: "0.3em" },
    { opacity: 1, letterSpacing: "0.18em", duration: 0.4, delay: 0.25, ease: "power2.out" },
  );
};

const hideScrollText = () => {
  if (!scrollTextEl.value || !dotEl.value || !scrollTextVisible) return;
  scrollTextVisible = false;

  gsap.to(scrollTextEl.value, {
    opacity: 0,
    letterSpacing: "0.4em",
    duration: 0.25,
    ease: "power2.in",
  });

  gsap.to(dotEl.value, {
    width: 10,
    height: 10,
    borderRadius: 200,
    duration: 0.35,
    delay: 0.1,
    ease: "power3.out",
  });
};

const onScroll = () => {
  if (scrollAppearTimer) {
    window.clearTimeout(scrollAppearTimer);
    scrollAppearTimer = null;
  }
  if (scrollTextVisible) {
    hideScrollText();
  }
};

const scheduleScrollText = () => {
  if (scrollAppearTimer) window.clearTimeout(scrollAppearTimer);

  if (window.scrollY > 0) return;

  scrollAppearTimer = window.setTimeout(() => {
    if (isScrollRoutes.value && state.value.mode === "default" && window.scrollY === 0) {
      showScrollText();
    }
  }, 5000);
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
      if (scrollTextVisible) hideScrollText();
      gsap.to(dotEl.value, {
        width: 56,
        height: 56,
        borderRadius: 0,
        duration: 0.22,
        ease: "power3.out",
      });
      if (iconEl.value) {
        gsap.to(iconEl.value, { opacity: 1, scale: 1, duration: 0.18, ease: "power3.out" });
      }
    } else if (!scrollTextVisible) {
      gsap.to(dotEl.value, {
        width: 10,
        height: 10,
        borderRadius: 0,
        duration: 0.22,
        ease: "power3.out",
      });
      if (iconEl.value) {
        gsap.to(iconEl.value, { opacity: 0, scale: 0.85, duration: 0.12, ease: "power2.out" });
      }
    }
  },
  { deep: true },
);

watch(interactionBus, () => {
  if (scrollAppearTimer) {
    window.clearTimeout(scrollAppearTimer);
    scrollAppearTimer = null;
  }
  if (scrollTextVisible) hideScrollText();
});

watch(
  () => route.path,
  () => {
    if (scrollTextVisible) hideScrollText();
    if (scrollAppearTimer) window.clearTimeout(scrollAppearTimer);
    if (isScrollRoutes.value) {
      scheduleScrollText();
    }
  },
);

onMounted(() => {
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  const quickX = gsap.quickTo(dotEl.value, "x", { duration: 0.18, ease: "power3.out" });
  const quickY = gsap.quickTo(dotEl.value, "y", { duration: 0.18, ease: "power3.out" });

  gsap.ticker.add(() => {
    if (!dotEl.value) return;
    if (!isMoving) return;

    quickX(mouse.x + 2);
    quickY(mouse.y - dotEl.value.offsetHeight);
  });
  if (dotEl.value) {
    gsap.set(dotEl.value, { x: -999, y: -999 });
  }

  if (isScrollRoutes.value) {
    scheduleScrollText();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("scroll", onScroll);
  if (idleTimer) window.clearTimeout(idleTimer);
  if (scrollAppearTimer) window.clearTimeout(scrollAppearTimer);
});
</script>

<template>
  <div
    ref="dotEl"
    aria-hidden="true"
    class="pointer-events-none origin-bottom-left w-2.5 h-2.5 fixed left-0 rounded-2xl top-0 z-9999 bg-foreground backdrop-blur will-change-transform flex items-center justify-center overflow-hidden"
  >
    <img
      ref="iconEl"
      :src="state.iconSrc || ''"
      alt=""
      class="absolute left-1/2 top-1/2 h-6 w-6 scale-95 -translate-x-1/2 -translate-y-1/2 opacity-0"
      draggable="false"
    />
    <span
      ref="scrollTextEl"
      class="whitespace-nowrap text-background opacity-0 select-none text-xs"
    >
      scroll
    </span>
  </div>
</template>
