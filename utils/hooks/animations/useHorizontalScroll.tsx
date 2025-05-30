import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { RefObject } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useHorizontalScroll = (
  containerRef: RefObject<HTMLDivElement>,
  triggerRef: RefObject<HTMLDivElement>,
): void => {
  const getScrollAmount = (): number | undefined => {
    let containerWidth: number | undefined = containerRef.current?.offsetWidth;
    let clientWidth: number = window.innerWidth;
    if (containerWidth) {
      return containerWidth - clientWidth;
    }
  };

  useGSAP(
    (): void => {
      gsap.fromTo(
        containerRef.current,
        {
          translateX: 0,
        },
        {
          ease: "none",
          translateX: (): string => `-${getScrollAmount()}px`,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            scrub: 0.5,
            invalidateOnRefresh: true,
            pin: true,
          },
        },
      );
    },
    { scope: triggerRef },
  );
};

export default useHorizontalScroll;
