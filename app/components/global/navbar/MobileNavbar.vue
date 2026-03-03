<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";

const appConfig = useAppConfig();
const route = useRoute();
const { $gsap } = useNuxtApp();
const { prepareSplitReveal } = useSplitTextAnimation();

type SplitReveal = ReturnType<typeof prepareSplitReveal>;

const mobileRoutes = computed(() =>
  appConfig.internalRoutes.map((link) => ({
    ...link,
    isActive: link.url === "/" ? route.path === "/" : route.path.startsWith(link.url),
  })),
);

const isOpen = ref(false);
const navRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);
const topLineRef = ref<HTMLElement | null>(null);
const middleLineRef = ref<HTMLElement | null>(null);
const bottomLineRef = ref<HTMLElement | null>(null);
const labelRefs = ref<HTMLElement[]>([]);

let menuTimeline: gsap.core.Timeline | null = null;
let splitReveals: SplitReveal[] = [];

function getClosedSize() {
  const buttonWidth = buttonRef.value?.offsetWidth ?? 44;
  const shellPadding = 12;

  return {
    width: buttonWidth + shellPadding,
    height: buttonWidth + shellPadding,
  };
}

function getExpandedSize() {
  return {
    width: contentRef.value?.scrollWidth ?? getClosedSize().width,
    height: contentRef.value?.scrollHeight ?? getClosedSize().height,
  };
}

function revertSplitText() {
  for (const reveal of splitReveals) {
    reveal.revert();
  }

  splitReveals = [];
}

function setClosedState() {
  const navEl = navRef.value;
  const listEl = listRef.value;
  if (!navEl) return;

  menuTimeline?.kill();
  menuTimeline = null;
  revertSplitText();

  const { width, height } = getClosedSize();

  $gsap.set(navEl, {
    width,
    height,
  });

  if (listEl) {
    $gsap.set(listEl, {
      autoAlpha: 0,
    });
  }

  $gsap.set([topLineRef.value, middleLineRef.value, bottomLineRef.value], {
    clearProps: "transform,opacity",
  });
}

function buildSplitText() {
  revertSplitText();
  splitReveals = labelRefs.value.filter(Boolean).map((labelEl) =>
    prepareSplitReveal(labelEl, {
      splitBy: "chars",
      duration: 0.36,
      stagger: 0.015,
      yPercent: 110,
      ease: "power3.out",
      clipLines: false,
      autoAlpha: 0,
    }),
  );
}

async function openMenu() {
  if (isOpen.value) return;

  isOpen.value = true;
  await nextTick();

  const navEl = navRef.value;
  const listEl = listRef.value;
  if (!navEl || !listEl) return;

  menuTimeline?.kill();
  buildSplitText();

  const expandedSize = getExpandedSize();

  $gsap.set(listEl, {
    autoAlpha: 1,
  });

  menuTimeline = $gsap.timeline();
  menuTimeline.to(navEl, {
    width: expandedSize.width,
    height: expandedSize.height,
    duration: 0.42,
    ease: "power3.inOut",
  });

  menuTimeline.to(
    topLineRef.value,
    {
      y: 7,
      rotate: 45,
      transformOrigin: "50% 50%",
      duration: 0.26,
      ease: "power2.out",
    },
    0.04,
  );

  menuTimeline.to(
    middleLineRef.value,
    {
      autoAlpha: 0,
      duration: 0.18,
      ease: "power2.out",
    },
    0.04,
  );

  menuTimeline.to(
    bottomLineRef.value,
    {
      y: -7,
      rotate: -45,
      transformOrigin: "50% 50%",
      duration: 0.26,
      ease: "power2.out",
    },
    0.04,
  );

  for (const [index, reveal] of splitReveals.entries()) {
    reveal.addToTimeline(menuTimeline, 0.14 + index * 0.045);
  }
}

function closeMenu() {
  if (!isOpen.value) return;

  const navEl = navRef.value;
  const listEl = listRef.value;
  if (!navEl || !listEl) {
    isOpen.value = false;
    return;
  }

  menuTimeline?.kill();

  const closedSize = getClosedSize();
  const chars = splitReveals.flatMap((reveal) => reveal.items);

  menuTimeline = $gsap.timeline({
    onComplete: () => {
      isOpen.value = false;
      setClosedState();
    },
  });

  if (chars.length) {
    menuTimeline.to(chars, {
      yPercent: -110,
      autoAlpha: 0,
      duration: 0.18,
      stagger: {
        each: 0.006,
        from: "end",
      },
      ease: "power2.in",
    });
  }

  menuTimeline.to(
    navEl,
    {
      width: closedSize.width,
      height: closedSize.height,
      duration: 0.34,
      ease: "power3.inOut",
    },
    chars.length ? 0.08 : 0,
  );

  menuTimeline.to(
    listEl,
    {
      autoAlpha: 0,
      duration: 0.16,
      ease: "power2.out",
    },
    0,
  );

  menuTimeline.to(
    topLineRef.value,
    {
      y: 0,
      rotate: 0,
      duration: 0.2,
      ease: "power2.out",
    },
    0.04,
  );

  menuTimeline.to(
    middleLineRef.value,
    {
      autoAlpha: 1,
      duration: 0.16,
      ease: "power2.out",
    },
    0.04,
  );

  menuTimeline.to(
    bottomLineRef.value,
    {
      y: 0,
      rotate: 0,
      duration: 0.2,
      ease: "power2.out",
    },
    0.04,
  );
}

function toggleMenu() {
  if (isOpen.value) {
    closeMenu();
    return;
  }

  openMenu();
}

function handleResize() {
  if (isOpen.value) {
    const navEl = navRef.value;
    if (!navEl) return;

    const expandedSize = getExpandedSize();
    $gsap.set(navEl, {
      width: expandedSize.width,
      height: expandedSize.height,
    });
    return;
  }

  setClosedState();
}

watch(
  () => route.fullPath,
  () => {
    if (isOpen.value) {
      closeMenu();
    }
  },
);

onMounted(async () => {
  await nextTick();
  setClosedState();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  menuTimeline?.kill();
  revertSplitText();
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <nav
    ref="navRef"
    :aria-expanded="isOpen"
    aria-label="Mobile navigation"
    class="bg-background/88 border-foreground/10 fixed right-5 bottom-5 z-9999 h-14 w-14 overflow-hidden border shadow-[0_18px_48px_rgba(0,0,0,0.14)] backdrop-blur-md md:hidden"
  >
    <div ref="contentRef" class="grid w-max justify-items-end gap-3 p-1.5">
      <ul
        v-show="isOpen"
        ref="listRef"
        :aria-hidden="!isOpen"
        :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'"
        class="flex flex-col items-end gap-2 pt-3 pr-3 pl-7 text-right"
      >
        <li v-for="link in mobileRoutes" :key="link.url" class="w-full">
          <NuxtLink
            :class="link.isActive ? 'text-foreground' : 'text-foreground-muted'"
            :prefetch="true"
            :tabindex="isOpen ? 0 : -1"
            :to="link.url"
            class="block text-[10px] leading-none font-medium tracking-[0.28em] uppercase transition-opacity duration-200 active:opacity-60"
            @click="closeMenu"
          >
            <span ref="labelRefs">{{ link.label }}</span>
          </NuxtLink>
        </li>
      </ul>

      <div class="h-10">
        <button
          ref="buttonRef"
          :aria-label="isOpen ? 'Close navigation' : 'Open navigation'"
          :aria-pressed="isOpen"
          class="bg-background text-foreground fixed right-0 bottom-0 flex size-11 cursor-pointer items-center justify-center"
          type="button"
          @click="toggleMenu"
        >
          <span class="sr-only">{{ isOpen ? "Close navigation" : "Open navigation" }}</span>
          <span class="relative block h-4 w-4">
            <span ref="topLineRef" class="bg-foreground absolute top-0 left-0 block h-px w-full" />
            <span
              ref="middleLineRef"
              class="bg-foreground absolute top-1/2 left-0 block h-px w-full -translate-y-1/2"
            />
            <span
              ref="bottomLineRef"
              class="bg-foreground absolute bottom-0 left-0 block h-px w-full"
            />
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>
