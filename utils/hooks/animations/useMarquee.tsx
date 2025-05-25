import { gsap } from "gsap";
import { useCallback, useRef } from "react";

export interface MarqueeRefs {
  container: HTMLDivElement | null;
  text: HTMLDivElement | null;
}

export function useMarqueeAnimation() {
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const startMarquee = useCallback((refs: MarqueeRefs) => {
    const { container, text } = refs;
    if (!container || !text) return;

    const singleTextWidth = text.offsetWidth / text.children.length;
    const containerWidth = container.offsetWidth;
    const instancesNeeded = Math.ceil(containerWidth / singleTextWidth) + 2;

    const currentInstances = text.children.length;
    for (let i = currentInstances; i < instancesNeeded; i++) {
      const clone = text.children[0].cloneNode(true);
      text.appendChild(clone);
    }

    gsap.to(container, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    const speed = 150;
    const duration = singleTextWidth / speed;

    gsap.set(text, { x: 0 });
    animationRef.current = gsap.to(text, {
      x: -singleTextWidth,
      duration: duration,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const stopMarquee = useCallback((container: HTMLDivElement | null) => {
    if (!container) return;

    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    gsap.to(container, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const cleanup = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  }, []);

  return { startMarquee, stopMarquee, cleanup };
}
