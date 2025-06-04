import { RefObject, useEffect } from "react";
import { gsap } from "gsap";

export type LoaderAnimationRefs = {
  containerRef: RefObject<HTMLDivElement | null>;
  faderRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
};

export type LoaderAnimationOptions = {
  onHide: () => void;
};

export const useLoader = (
  { containerRef, faderRef, imageRef }: LoaderAnimationRefs,
  { onHide }: LoaderAnimationOptions,
) => {
  useEffect(() => {
    if (!containerRef.current || !faderRef.current || !imageRef.current) return;

    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      onStart: onHide,
    });
    tl.to(imageRef.current, {
      margin: 0,
      top: 0,
      duration: 1.5,
      ease: "power4.inOut",
    });
    tl.to(containerRef.current, {
      display: "none",
    });
    tl.to(faderRef.current, {
      opacity: 0,
      duration: 0.6,
    });
    tl.to(faderRef.current, {
      display: "none",
    });
  }, [containerRef, faderRef, imageRef, onHide]);
};
