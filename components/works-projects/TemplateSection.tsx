"use client";

import { FC, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { WorkProjectBase } from "../../utils/data/types";
import { useHorizontalScrollWithText } from "../../utils/hooks/animations/useHorizontalScrollWithText";
import TemplateItem from "./TemplateItem";
import TemplateText from "./TemplateText";
import TemplateNavigation from "./TemplateNavigation";

type WorksProps = {
  works: WorkProjectBase[];
  path: string;
};

const TemplateSection: FC<WorksProps> = ({ works, path }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  const itemsWrapperRef = useRef<HTMLDivElement | null>(null);
  const textWrapperRef = useRef<HTMLDivElement | null>(null);
  const navigationWrapperRef = useRef<HTMLDivElement | null>(null);

  const { currentIndex, scrollToItem } = useHorizontalScrollWithText({
    items: works,
    containerRef,
    triggerRef,
    titleRef,
    subtitleRef,
  });

  useGSAP(() => {
    gsap.set(
      [
        itemsWrapperRef.current,
        textWrapperRef.current,
        navigationWrapperRef.current,
      ],
      {
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
      },
    );

    const tl = gsap.timeline();

    tl.to(itemsWrapperRef.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        textWrapperRef.current,
        {
          y: "calc(-50% + 60px)",
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .to(
        navigationWrapperRef.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );
  }, []);

  return (
    <div className="overflow-hidden pt-1">
      <div className="relative" ref={triggerRef}>
        <div ref={itemsWrapperRef}>
          <div ref={containerRef} className="flex h-screen w-fit">
            {works.map((work, index) => (
              <TemplateItem key={index} work={work} path={path} />
            ))}
          </div>
        </div>

        <div
          className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 text-center"
          ref={textWrapperRef}
        >
          <TemplateText
            work={works[currentIndex] || works[0]}
            path={path}
            titleRef={titleRef}
            subtitleRef={subtitleRef}
          />
        </div>

        <div ref={navigationWrapperRef}>
          <TemplateNavigation
            works={works}
            currentIndex={currentIndex}
            onNavigate={scrollToItem}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateSection;
