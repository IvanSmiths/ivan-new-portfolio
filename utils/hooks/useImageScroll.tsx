"use client";

import { RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ImageWrapperRefs = {
  [key: number]: (HTMLDivElement | null)[];
};

interface UseImagesScrollAnimationProps {
  gridRef: RefObject<HTMLElement | null>;
  columnRefs: RefObject<(HTMLDivElement | null)[]>;
  imageWrapperRefs: RefObject<ImageWrapperRefs>;
}

export const useImagesScroll = ({
  gridRef,
  columnRefs,
  imageWrapperRefs,
}: UseImagesScrollAnimationProps) => {
  useGSAP(() => {
    if (!gridRef.current) return;

    const middleColumn = columnRefs.current?.[1];
    if (middleColumn) {
      gsap.to(middleColumn, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "clamp(top bottom)",
          end: "clamp(bottom top)",
          scrub: true,
        },
      });
    }

    [0, 2].forEach((columnIndex) => {
      const columnWrappers = imageWrapperRefs.current?.[columnIndex] || [];

      columnWrappers.forEach((wrapper) => {
        if (!wrapper) return;

        gsap.to(wrapper, {
          rotation: columnIndex === 0 ? -3 : 3,
          xPercent: columnIndex === 0 ? -4 : 4,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.parentElement,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: true,
          },
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [gridRef, columnRefs, imageWrapperRefs]);
};
