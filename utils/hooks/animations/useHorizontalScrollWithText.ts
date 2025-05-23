import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RefObject, useRef, useState } from "react";

interface UseHorizontalScrollProps<T> {
  items: T[];
  containerRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLHeadingElement | null>;
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

  gsap.registerPlugin(ScrollTrigger);

  const getScrollAmount = (): number | undefined => {
    let containerWidth = containerRef.current?.offsetWidth;
    let clientWidth = window.innerWidth;
    if (containerWidth) {
      return containerWidth - clientWidth;
    }
  };

  const hideText = () => {
    const textElements = [titleRef.current, subtitleRef.current];
    gsap.to(textElements, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05,
    });
  };

  const showText = () => {
    const textElements = [titleRef.current, subtitleRef.current];
    gsap.to(textElements, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.1,
    });
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
          duration: 2,
          translateX: (): string => `-${getScrollAmount()}px`,
          scrollTrigger: {
            id: "worksScroll",
            trigger: triggerRef.current,
            start: "top top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (items.length - 1),
              duration: 0.6,
              delay: 0.5,
              ease: "power1.inOut",
              onComplete: () => {
                showText();
              },
            },
            pin: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const totalItems = items.length;

              // Check if we're outside the snappable range
              const isBeforeFirstItem = progress <= 0;
              const isAfterLastItem = progress >= 1;

              if (isBeforeFirstItem || isAfterLastItem) {
                if (scrollTimeoutRef.current) {
                  clearTimeout(scrollTimeoutRef.current);
                  scrollTimeoutRef.current = null;
                }
                showText();

                if (isBeforeFirstItem) {
                  setCurrentIndex(0);
                } else {
                  setCurrentIndex(totalItems - 1);
                }
                return;
              }

              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = null;
              } else {
                hideText();
              }

              const segmentSize = 1 / (totalItems - 1);
              let newIndex = 0;

              for (let i = 0; i < totalItems; i++) {
                const segmentStart = i * segmentSize;
                const segmentEnd = (i + 1) * segmentSize;

                if (
                  progress >= segmentStart - 0.1 &&
                  progress <= segmentEnd + 0.1
                ) {
                  if (progress <= segmentStart + segmentSize / 2) {
                    newIndex = i;
                  } else if (i < totalItems - 1) {
                    newIndex = i + 1;
                  } else {
                    newIndex = i;
                  }
                  break;
                }
              }
              newIndex = Math.max(0, Math.min(newIndex, totalItems - 1));
              if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
              }
            },
            onRefresh: () => {
              setCurrentIndex(0);
              showText();
            },
          },
        },
      );
    },
    { scope: triggerRef },
  );

  const scrollToItem = (index: number) => {
    const scrollTrigger = ScrollTrigger.getById("worksScroll");
    if (scrollTrigger) {
      const progress = index / (items.length - 1);
      scrollTrigger.scroll(
        scrollTrigger.start +
          (scrollTrigger.end - scrollTrigger.start) * progress,
      );
    }
  };

  return {
    currentIndex,
    scrollToItem,
  };
};
