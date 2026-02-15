import { gsap } from "gsap";
import { onBeforeUnmount, onMounted, type Ref, ref } from "vue";

export function useHorizontalScroll(
  containerRef: Ref<HTMLElement | null>,
  triggerRef: Ref<HTMLElement | null>,
) {
  const tween = ref<gsap.core.Tween | null>(null);

  function getScrollAmount(): number {
    const containerWidth = containerRef.value?.offsetWidth;
    const clientWidth = window.innerWidth;

    if (!containerWidth) return 0;
    return Math.max(0, containerWidth - clientWidth);
  }

  onMounted(() => {
    if (!containerRef.value || !triggerRef.value) return;

    void (async () => {
      const mod = await import("gsap/dist/ScrollTrigger");
      const ScrollTrigger = (mod as unknown as { default: gsap.Plugin }).default;

      gsap.registerPlugin(ScrollTrigger);

      tween.value = gsap.fromTo(
        containerRef.value,
        { x: 0 },
        {
          ease: "none",
          x: () => `-${getScrollAmount()}px`,
          scrollTrigger: {
            trigger: triggerRef.value,
            start: "top top",
            scrub: 0.5,
            invalidateOnRefresh: true,
            pin: true,
          },
        },
      );
    })();
  });

  onBeforeUnmount(() => {
    tween.value?.scrollTrigger?.kill();
    tween.value?.kill();
    tween.value = null;
  });
}
