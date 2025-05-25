import { RefObject, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollTextFillAnimationOptions {
  refs: (HTMLElement | null)[];
  triggerRef: RefObject<HTMLElement | null>;
}

export const useScrollTextFill = ({
  refs,
  triggerRef,
}: UseScrollTextFillAnimationOptions) => {
  useEffect(() => {
    if (!triggerRef.current) return;
    gsap.to(refs, {
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1,
      },
      ease: "power2.out",
    });
  }, [refs, triggerRef]);
};
