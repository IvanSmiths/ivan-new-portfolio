import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { RefObject } from "react";

type UseFadeInOnLoadProps = {
  refs: RefObject<HTMLElement | null>[];
  options?: {
    duration?: number;
    yOffset?: number;
    blurAmount?: number;
    stagger?: number;
  };
};

export const useFadeInOnLoad = ({
  refs,
  options = {},
}: UseFadeInOnLoadProps) => {
  const {
    duration = 0.8,
    yOffset = 60,
    blurAmount = 10,
    stagger = 0.1,
  } = options;

  useGSAP(
    () => {
      gsap.set(
        refs.map((ref) => ref.current),
        {
          y: yOffset,
          opacity: 0,
          filter: `blur(${blurAmount}px)`,
        },
      );

      const tl = gsap.timeline();

      refs.forEach((ref, i) => {
        if (!ref.current) return;
        tl.to(
          ref.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: duration,
            ease: "power3.out",
          },
          i * stagger,
        );
      });
    },
    {
      dependencies: [],
      scope: refs[0],
    },
  );
};
