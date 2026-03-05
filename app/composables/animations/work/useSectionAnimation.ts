import { nextTick, onMounted, onScopeDispose, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";

export function useSectionAnimation() {
  const { $gsap, $ScrollTrigger } = useNuxtApp();
  const route = useRoute();
  const { prepareSplitReveal } = useSplitTextAnimation();

  const shortDescriptionRef = ref<HTMLElement | null>(null);

  let ctx: any = null;
  let descriptionReveal: ReturnType<typeof prepareSplitReveal> | null = null;

  function cleanup() {
    ctx?.revert();
    descriptionReveal?.revert();
    ctx = null;
    descriptionReveal = null;
  }

  async function waitForScrollReset(maxFrames = 18) {
    if (typeof window === "undefined") return;

    for (let i = 0; i < maxFrames; i += 1) {
      if (window.scrollY <= 2) return;
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
  }

  function init() {
    if (!shortDescriptionRef.value) return;

    cleanup();

    ctx = $gsap.context(() => {
      descriptionReveal = prepareSplitReveal(shortDescriptionRef.value, {
        splitBy: "lines",
        duration: 0.9,
        stagger: 0.12,
        yPercent: 105,
      });

      const tl = $gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: shortDescriptionRef.value,
          start: "top 85%",
          once: true,
        },
      });

      descriptionReveal.addToTimeline(tl);
    }, shortDescriptionRef.value);

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

  return { shortDescriptionRef };
}
