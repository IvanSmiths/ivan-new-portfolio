import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

interface UseHorizontalScrollProps<T> {
  items: T[];
  containerRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLHeadingElement | null>;
}

enum ScrollMode {
  USER = "user",
  PROGRAMMATIC = "programmatic",
  IDLE = "idle",
}

export const useHorizontalScrollWithText = <T>({
  items,
  containerRef,
  triggerRef,
  titleRef,
  subtitleRef,
}: UseHorizontalScrollProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollModeRef = useRef<ScrollMode>(ScrollMode.IDLE);
  const lastUserScrollTime = useRef<number>(0);
  const programmaticScrollTween = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const getScrollAmount = (): number => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const clientWidth = window.innerWidth;
    return Math.max(0, containerWidth - clientWidth);
  };

  const hideText = useCallback(() => {
    const textElements = [titleRef.current, subtitleRef.current].filter(
      Boolean,
    );
    gsap.to(textElements, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05,
    });
  }, [subtitleRef, titleRef]);

  const showText = useCallback(() => {
    const textElements = [titleRef.current, subtitleRef.current].filter(
      Boolean,
    );
    gsap.to(textElements, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, []);

  const updateScrollMode = useCallback((mode: ScrollMode) => {
    scrollModeRef.current = mode;

    if (mode === ScrollMode.USER) {
      lastUserScrollTime.current = Date.now();
    }
  }, []);

  const calculateIndexFromProgress = useCallback(
    (progress: number): number => {
      const totalItems = items.length;
      const exactIndex = progress * (totalItems - 1);
      return Math.max(0, Math.min(Math.round(exactIndex), totalItems - 1));
    },
    [items.length],
  );

  const handleScrollUpdate = useCallback(
    (self: ScrollTrigger) => {
      const now = Date.now();
      const timeSinceLastProgrammaticScroll = now - lastUserScrollTime.current;

      if (
        scrollModeRef.current === ScrollMode.PROGRAMMATIC &&
        timeSinceLastProgrammaticScroll < 1200
      ) {
        return;
      }

      if (scrollModeRef.current !== ScrollMode.PROGRAMMATIC) {
        updateScrollMode(ScrollMode.USER);
        lastUserScrollTime.current = now;
      }

      const progress = self.progress;
      const totalItems = items.length;

      if (progress <= 0) {
        setCurrentIndex(0);
        if (scrollModeRef.current === ScrollMode.USER) {
          showText();
        }
        return;
      }

      if (progress >= 1) {
        setCurrentIndex(totalItems - 1);
        if (scrollModeRef.current === ScrollMode.USER) {
          showText();
        }
        return;
      }

      if (scrollModeRef.current === ScrollMode.USER) {
        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        hideText();

        const newIndex = calculateIndexFromProgress(progress);

        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    },
    [
      currentIndex,
      items.length,
      calculateIndexFromProgress,
      hideText,
      showText,
      updateScrollMode,
    ],
  );

  const handleSnapComplete = useCallback(() => {
    showText();
    setTimeout(() => {
      updateScrollMode(ScrollMode.IDLE);
    }, 50);
  }, [showText, updateScrollMode]);

  useGSAP(
    (): void => {
      const scrollAmount = getScrollAmount();

      if (!containerRef.current || !triggerRef.current || scrollAmount <= 0) {
        return;
      }

      const scrollTrigger = ScrollTrigger.create({
        id: "worksScroll",
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${scrollAmount}`,
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (progress: number) => {
            if (
              scrollModeRef.current === ScrollMode.USER ||
              scrollModeRef.current === ScrollMode.IDLE
            ) {
              return (
                Math.round(progress * (items.length - 1)) / (items.length - 1)
              );
            }
            return progress;
          },
          duration: 0.6,
          delay: 0.25,
          ease: "power2.inOut",
          onComplete: handleSnapComplete,
        },
        animation: gsap.fromTo(
          containerRef.current,
          { translateX: 0 },
          {
            translateX: -scrollAmount,
            ease: "none",
          },
        ),
        onUpdate: handleScrollUpdate,
        onRefresh: () => {
          setCurrentIndex(0);
          updateScrollMode(ScrollMode.IDLE);
          showText();
        },
      });

      scrollTriggerInstance.current = scrollTrigger;

      return () => {
        scrollTrigger.kill();
        scrollTriggerInstance.current = null;
      };
    },
    { scope: triggerRef, dependencies: [items.length] },
  );

  const scrollToItem = useCallback(
    (index: number) => {
      if (!scrollTriggerInstance.current || index === currentIndex) {
        return;
      }

      if (programmaticScrollTween.current) {
        programmaticScrollTween.current.kill();
      }
      updateScrollMode(ScrollMode.PROGRAMMATIC);
      lastUserScrollTime.current = Date.now();

      setTimeout(() => {
        setCurrentIndex(index);
      }, 500);
      hideText();

      const targetProgress = index / (items.length - 1);
      const scrollTrigger = scrollTriggerInstance.current;
      const targetScroll =
        scrollTrigger.start +
        (scrollTrigger.end - scrollTrigger.start) * targetProgress;

      programmaticScrollTween.current = gsap.to(window, {
        scrollTo: {
          y: targetScroll,
          autoKill: false,
        },
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            showText();
            updateScrollMode(ScrollMode.IDLE);
            programmaticScrollTween.current = null;
          }, 100);
        },
        onInterrupt: () => {
          updateScrollMode(ScrollMode.USER);
          programmaticScrollTween.current = null;
        },
      });
    },
    [currentIndex, items.length, updateScrollMode, hideText, showText],
  );

  const cleanup = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    if (programmaticScrollTween.current) {
      programmaticScrollTween.current.kill();
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    currentIndex,
    scrollToItem,
  };
};
