"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FC, Key, useRef, useState } from "react";
import { useAnimationStore } from "../../utils/store";
import { WorkProjectBase } from "../../utils/pages/types";
import Link from "next/link";

type WorksProps = {
  works: WorkProjectBase[];
  path: string;
};

const TemplateSection: FC<WorksProps> = ({ works, path }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  const { slowest, normal } = useAnimationStore();

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
          duration: slowest,
          translateX: (): string => `-${getScrollAmount()}px`,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (works.length - 1),
              duration: normal,
              delay: 0,
              ease: "power1.inOut",
              onComplete: () => {
                showText();
              },
            },
            pin: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const totalWorks = works.length;

              // Check if we're outside the snappable range
              const isBeforeFirstWork = progress <= 0;
              const isAfterLastWork = progress >= 1;

              if (isBeforeFirstWork || isAfterLastWork) {
                if (scrollTimeoutRef.current) {
                  clearTimeout(scrollTimeoutRef.current);
                  scrollTimeoutRef.current = null;
                }
                showText();

                if (isBeforeFirstWork) {
                  setCurrentIndex(0);
                } else {
                  setCurrentIndex(totalWorks - 1);
                }
                return;
              }

              if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = null;
              } else {
                hideText();
              }

              const segmentSize = 1 / (totalWorks - 1);
              let newIndex = 0;

              for (let i = 0; i < totalWorks; i++) {
                const segmentStart = i * segmentSize;
                const segmentEnd = (i + 1) * segmentSize;

                if (
                  progress >= segmentStart - 0.1 &&
                  progress <= segmentEnd + 0.1
                ) {
                  if (progress <= segmentStart + segmentSize / 2) {
                    newIndex = i;
                  } else if (i < totalWorks - 1) {
                    newIndex = i + 1;
                  } else {
                    newIndex = i;
                  }
                  break;
                }
              }
              newIndex = Math.max(0, Math.min(newIndex, totalWorks - 1));
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

  return (
    <div className="overflow-hidden">
      <div ref={triggerRef} className="relative">
        {/* Scrolling images container */}
        <div ref={containerRef} className="flex h-screen w-fit">
          {works.map((work: WorkProjectBase, index: Key) => (
            <div
              key={index}
              className="relative flex h-screen w-screen items-center justify-center"
            >
              <div className="w-3/12">
                <Link href={`${path}/${work.slug}`}>
                  <img
                    className="h-full w-full object-cover"
                    src={work.homeImage.url}
                    alt={work.name}
                    width={work.homeImage.width}
                    height={work.homeImage.height}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h2
          ref={titleRef}
          className="absolute top-60 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 text-center text-8xl font-black uppercase"
        >
          {works[currentIndex]?.name}
        </h2>
        <h3
          ref={subtitleRef}
          className="absolute top-48 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 text-center"
        >
          {works[currentIndex]?.role}
        </h3>
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="flex gap-4">
            {works.map((work: WorkProjectBase, index: number) => (
              <button
                key={index}
                className={`relative h-12 w-16 overflow-hidden rounded transition-all duration-300 hover:scale-110 ${
                  index === currentIndex
                    ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-black"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  className="h-full w-full object-cover"
                  src={work.homeImage.url}
                  alt={`Navigate to ${work.name}`}
                  width={64}
                  height={48}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSection;
