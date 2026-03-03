import { onMounted, onScopeDispose, ref } from "vue";
import { useSplitTextAnimation } from "~/composables/animations/global/useSplitAnimation";

export function useWorkHeaderAnimation() {
  const { $gsap } = useNuxtApp();
  const { prepareSplitReveal } = useSplitTextAnimation();

  const rootRef = ref<HTMLElement | null>(null);
  const imageWrapRef = ref<HTMLElement | null>(null);
  const titleRef = ref<HTMLElement | null>(null);
  const roleRef = ref<HTMLElement | null>(null);
  const metaBarRef = ref<HTMLElement | null>(null);
  const spacerRef = ref<HTMLElement | null>(null);

  let ctx: any = null;
  let titleReveal: ReturnType<typeof prepareSplitReveal> | null = null;
  let roleReveal: ReturnType<typeof prepareSplitReveal> | null = null;

  function cleanup() {
    ctx?.revert();
    titleReveal?.revert();
    roleReveal?.revert();
    ctx = null;
    titleReveal = null;
    roleReveal = null;
  }

  onMounted(() => {
    if (!rootRef.value || !imageWrapRef.value) return;

    const multiplier = 7;
    const extraSpaceNeeded = imageWrapRef.value.offsetHeight * (multiplier / 10);

    cleanup();

    ctx = $gsap.context(() => {
      $gsap.set(imageWrapRef.value, {
        translateY: 0,
        scaleX: 1,
        willChange: "transform",
        objectPosition: "top",
      });

      $gsap.set(spacerRef.value, { height: extraSpaceNeeded });

      titleReveal = prepareSplitReveal(titleRef.value, {
        splitBy: "words",
        stagger: 0.018,
        delay: 0.8,
      });
      roleReveal = prepareSplitReveal(roleRef.value, {
        splitBy: "chars",
        stagger: 0.02,
        delay: 0.82,
      });

      if (metaBarRef.value) {
        $gsap.set(metaBarRef.value, { y: 18, willChange: "transform" });
      }

      const tl = $gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(
        imageWrapRef.value,
        {
          duration: 1.25,
          translateY: `${multiplier * 10}%`,
          ease: "power3.inOut",
        },
        0,
      ).to(metaBarRef.value, { duration: 0.9, delay: 0.8, y: 0 }, 0.12);

      titleReveal.addToTimeline(tl, 0.05);
      roleReveal.addToTimeline(tl, 0.08);
    }, rootRef.value);
  });

  onScopeDispose(() => cleanup());

  return { rootRef, imageWrapRef, titleRef, roleRef, metaBarRef, spacerRef };
}
