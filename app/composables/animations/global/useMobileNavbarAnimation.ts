import { nextTick, onMounted, onScopeDispose, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";

export function useMobileNavbarAnimation() {
  const route = useRoute();
  const { $gsap } = useNuxtApp();
  const { prepareSplitReveal } = useSplitTextAnimation();

  type SplitReveal = ReturnType<typeof prepareSplitReveal>;

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
    const buttonWidth = buttonRef.value?.offsetWidth ?? 0;
    const shellPadding = 0;

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
        duration: 0.1,
        stagger: 0.1,
        yPercent: 110,
        delay: 0.1,
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
        y: -6,
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

    void openMenu();
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

  onMounted(async () => {
    await nextTick();
    setClosedState();
    window.addEventListener("resize", handleResize);
  });

  watch(
    () => route.fullPath,
    () => {
      if (isOpen.value) {
        closeMenu();
      }
    },
  );

  onScopeDispose(() => {
    menuTimeline?.kill();
    revertSplitText();
    window.removeEventListener("resize", handleResize);
  });

  return {
    isOpen,
    navRef,
    contentRef,
    listRef,
    buttonRef,
    topLineRef,
    middleLineRef,
    bottomLineRef,
    labelRefs,
    closeMenu,
    toggleMenu,
  };
}
