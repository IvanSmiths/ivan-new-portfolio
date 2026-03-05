import { nextTick, onMounted, onScopeDispose, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";
import { useLogoHover } from "~/composables/animations/home/useLogoHover";

export function useAboutHeroAnimation() {
  const { $gsap, $ScrollTrigger } = useNuxtApp();
  const route = useRoute();
  const { prepareReveal, prepareSplitReveal } = useSplitTextAnimation();

  const rootRef = ref<HTMLElement | null>(null);
  const labelRef = ref<HTMLElement | null>(null);
  const copyRef = ref<HTMLElement | null>(null);
  const imageRef = ref<HTMLElement | null>(null);
  const lettersRef = ref<SVGGElement | null>(null);
  const hoverAnimation = useLogoHover(lettersRef);

  let ctx: gsap.Context | null = null;
  let labelReveal: ReturnType<typeof prepareReveal> | null = null;
  let imageReveal: ReturnType<typeof prepareReveal> | null = null;
  let copyReveal: ReturnType<typeof prepareSplitReveal> | null = null;

  function cleanup() {
    ctx?.revert();
    labelReveal?.revert();
    imageReveal?.revert();
    copyReveal?.revert();
    ctx = null;
    labelReveal = null;
    imageReveal = null;
    copyReveal = null;
  }

  async function waitForScrollReset(maxFrames = 18) {
    if (typeof window === "undefined") return;

    for (let i = 0; i < maxFrames; i += 1) {
      if (window.scrollY <= 2) return;
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
  }

  function getLetterGroups() {
    return Array.from(lettersRef.value?.children ?? [])
      .filter((node): node is SVGGElement => node instanceof SVGGElement)
      .reverse();
  }

  function init() {
    if (!rootRef.value) return;

    cleanup();

    ctx = $gsap.context(() => {
      const tl = $gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: rootRef.value,
          start: "top 85%",
          once: true,
        },
      });

      const groups = getLetterGroups();
      if (groups.length) {
        $gsap.set(groups, { y: 100, autoAlpha: 0 });
        tl.to(groups, {
          y: 0,
          autoAlpha: 1,
          duration: 2,
          stagger: 0.05,
          ease: "expo.out",
          clearProps: "transform,opacity,visibility",
        });
      }

      labelReveal = prepareReveal(labelRef.value, {
        duration: 0.9,
        stagger: 0.12,
        yPercent: 105,
      });
      imageReveal = prepareReveal(imageRef.value, {
        duration: 0.9,
        stagger: 0.12,
        yPercent: 18,
      });
      copyReveal = prepareSplitReveal(copyRef.value, {
        splitBy: "lines",
        duration: 0.9,
        stagger: 0.12,
        yPercent: 105,
      });

      labelReveal.addToTimeline(tl, 0.15);
      imageReveal.addToTimeline(tl, 0.2);
      copyReveal.addToTimeline(tl, 0.3);
    }, rootRef.value);

    hoverAnimation.setup();
    $ScrollTrigger.refresh();
  }

  async function initAfterRouteUpdate() {
    await nextTick();
    await waitForScrollReset();
    init();
  }

  onMounted(() => {
    void initAfterRouteUpdate();
  });

  watch(
    () => route.fullPath,
    () => {
      void initAfterRouteUpdate();
    },
    { flush: "post" },
  );

  onScopeDispose(() => {
    cleanup();
  });

  return {
    rootRef,
    labelRef,
    copyRef,
    imageRef,
    lettersRef,
  };
}
