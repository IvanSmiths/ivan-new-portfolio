import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { WorkProjectBase } from "../../data/types";
import { MarqueeHandle } from "../../../components/home/Works/Marquee";
import { useMarqueeAnimation } from "./useMarquee";

export function useWorkItemAnimations(works: WorkProjectBase[]) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>(works.map(() => null));
  const marqueeRefs = useRef<(MarqueeHandle | null)[]>(works.map(() => null));

  const { startMarquee, stopMarquee, cleanup } = useMarqueeAnimation();

  const handleLinkRef = (index: number, el: HTMLAnchorElement | null) => {
    linkRefs.current[index] = el;
  };

  const handleMarqueeRef = (index: number, el: MarqueeHandle | null) => {
    marqueeRefs.current[index] = el;
  };

  useGSAP(() => {
    const cleanupFunctions: (() => void)[] = [];

    works.forEach((_, index) => {
      const link = linkRefs.current[index];
      const marqueeHandle = marqueeRefs.current[index];

      if (!link || !marqueeHandle) return;

      const handleMouseEnter = () => {
        startMarquee(marqueeHandle);
      };

      const handleMouseLeave = () => {
        stopMarquee(marqueeHandle.container);
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach((fn) => fn());
      cleanup();
    };
  });

  return {
    handleLinkRef,
    handleMarqueeRef,
  };
}
