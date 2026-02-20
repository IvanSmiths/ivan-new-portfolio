<script lang="ts" setup>
import gsap from "gsap";

const route = useRoute();
const { state, interactionBus } = useCursorHelper();

const dotEl = ref<HTMLDivElement | null>(null);
const scrollTextEl = ref<HTMLSpanElement | null>(null);
const hoverTextEl = ref<HTMLSpanElement | null>(null);

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
    { opacity: 0, letterSpacing: "0em", display: "none", visibility: "hidden" },
    {
      opacity: 1,
      letterSpacing: "0.10em",
      display: "block",
      visibility: "visible",
      duration: 0.4,
      delay: 0.25,
      ease: "power2.out",
    },
  );
};

const hideScrollText = () => {
  if (!scrollTextEl.value || !dotEl.value || !scrollTextVisible) return;
  scrollTextVisible = false;

  gsap.killTweensOf(scrollTextEl.value);
  gsap.killTweensOf(dotEl.value, "width,height,borderRadius,letterSpacing");

  gsap.to(scrollTextEl.value, {
    opacity: 0,
    display: "none",
    visibility: "hidden",
    duration: 0.25,
    letterSpacing: "0.10em",
    ease: "power2.in",
  });

  gsap.to(dotEl.value, {
    width: 10,
    height: 10,
    borderRadius: 200,
    letterSpacing: "0em",
    duration: 0.35,
    delay: 0.1,
    ease: "power3.out",
  });
};

const measureHoverWidth = () => {
  const w = hoverTextEl.value?.scrollWidth ?? 0;
  return Math.max(56, w + 30);
};

const showHoverText = () => {
  if (!dotEl.value || !hoverTextEl.value) return;

  const targetW = measureHoverWidth();

  gsap.to(dotEl.value, {
    width: targetW,
    height: 28,
    borderRadius: 0,
    duration: 0.22,
    ease: "power3.out",
  });

  gsap.fromTo(
    hoverTextEl.value,
    { opacity: 0, letterSpacing: "0em" },
    { opacity: 1, letterSpacing: "0.10em", duration: 0.18, ease: "power2.out" },
  );
};

const hideHoverText = () => {
  if (!dotEl.value || !hoverTextEl.value) return;

  gsap.to(hoverTextEl.value, {
    opacity: 0,
    duration: 0.15,
    letterSpacing: "0em",
    ease: "power2.in",
  });

  gsap.to(dotEl.value, {
    width: 10,
    height: 10,
    borderRadius: 200,
    duration: 0.22,
    ease: "power3.out",
  });
};

const onScroll = () => {
  if (scrollAppearTimer) {
    window.clearTimeout(scrollAppearTimer);
    scrollAppearTimer = null;
  }
  if (scrollTextVisible) hideScrollText();
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

    const hasHoverText = !!next.hoverText;
    const isHoverMode = next.mode === "hover";

    const shouldShowHoverText = isContactsRoute.value && isHoverMode && hasHoverText;
    const shouldExpandIcon =
      isContactsRoute.value && isHoverMode && !!next.iconComponent && !hasHoverText;

    if (shouldShowHoverText) {
      if (scrollTextVisible) hideScrollText();
      requestAnimationFrame(() => showHoverText());
      return;
    }

    if (shouldExpandIcon) {
      if (scrollTextVisible) hideScrollText();
      gsap.to(dotEl.value, {
        width: 56,
        height: 56,
        borderRadius: 200,
        duration: 0.22,
        ease: "power3.out",
      });
      return;
    }

    if (!scrollTextVisible) {
      hideHoverText();
    }
  },
  { deep: true },
);

watch(
  () => state.value.hoverText,
  () => {
    if (!dotEl.value) return;
    if (isContactsRoute.value && state.value.mode === "hover" && state.value.hoverText) {
      requestAnimationFrame(() => showHoverText());
    }
  },
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

    if (!isContactsRoute.value && state.value.hoverText) {
      hideHoverText();
    }

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
    class="pointer-events-none origin-bottom-left w-2.5 h-2.5 fixed left-0 rounded-2xl top-0 z-9999 bg-foreground backdrop-blur will-change-transform hidden lg:flex items-center justify-center overflow-hidden"
  >
    <Transition name="icon-fade">
      <component
        :is="state.iconComponent"
        v-if="state.iconComponent && !state.hoverText"
        class="absolute p-0.5 inset-0 w-full h-full text-background"
      />
    </Transition>

    <span ref="hoverTextEl" class="whitespace-nowrap text-background opacity-0 select-none text-xs">
      {{ state.hoverText }}
    </span>

    <span
      ref="scrollTextEl"
      class="whitespace-nowrap hidden text-background opacity-0 select-none text-xs"
    >
      scroll
    </span>
  </div>
</template>
