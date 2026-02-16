import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Ref } from "vue";

interface UseScrollTextFillOptions {
  refs: Ref<(HTMLSpanElement | null)[]>;
  triggerRef: Ref<HTMLElement | null> | null;
}

export function useScrollTextFill({ refs, triggerRef }: UseScrollTextFillOptions) {
  onMounted(() => {
    if (import.meta.client && triggerRef?.value) {
      gsap.registerPlugin(ScrollTrigger);

      const validRefs = refs.value.filter(Boolean) as HTMLSpanElement[];

      validRefs.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: triggerRef.value,
            start: "top center",
            end: "bottom center",
            scrub: true,
            invalidateOnRefresh: true,
          },
          opacity: 1,
          ease: "none",
        });
      });

      ScrollTrigger.refresh();
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
  });
}
