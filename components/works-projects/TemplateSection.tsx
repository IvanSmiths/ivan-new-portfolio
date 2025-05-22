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
  const [currentIndex, setCurrentIndex] = useState(0);

  gsap.registerPlugin(ScrollTrigger);

  const { slowest, normal } = useAnimationStore();

  const getScrollAmount = (): number | undefined => {
    let containerWidth = containerRef.current?.offsetWidth;
    let clientWidth = window.innerWidth;
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
              onComplete: (self) => {
                const progress = self.progress;
                const newIndex = Math.round(progress * (works.length - 1));
                setCurrentIndex(
                  Math.max(0, Math.min(newIndex, works.length - 1)),
                );
              },
            },
            pin: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const totalWorks = works.length;

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
              <span className="top-2xl left-xl absolute">{index}</span>
              <div className="w-5/12">
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

        {/* Stationary text overlay */}
        <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center">
          <div className="flex w-5/12 justify-between">
            <h2>{works[currentIndex]?.role}</h2>
            <h3>{works[currentIndex]?.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSection;
