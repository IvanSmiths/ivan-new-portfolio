"use client";

import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Hook to animate swapping text using fade and blur.
 * Hides element on first render and fades it in.
 */
export function useTextSwap(
  ref: RefObject<HTMLElement | null>,
  newText: string | null,
  fallbackText: string,
) {
  const isInitialRender = useRef(true);

  const text = newText || fallbackText;
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const finalText = newText || fallbackText;

      gsap.killTweensOf(el);

      if (isInitialRender.current) {
        el.textContent = finalText;
        gsap.to(el, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
        });
        isInitialRender.current = false;
        return;
      }

      gsap.to(el, {
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          el.textContent = finalText;

          gsap.fromTo(
            el,
            { opacity: 0, filter: "blur(4px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.25,
              ease: "power2.out",
            },
          );
        },
      });
    },
    { dependencies: [text] },
  );
}
