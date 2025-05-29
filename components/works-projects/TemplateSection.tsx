"use client";

import { FC, useRef } from "react";
import { WorkProjectBase } from "../../utils/data/types";
import { useHorizontalScrollWithText } from "../../utils/hooks/animations/useHorizontalScrollWithText";
import TemplateText from "./TemplateText";
import TemplateNavigation from "./TemplateNavigation";
import TemplateItemWrapper from "./TemplateItemWrapper";
import { useFadeInOnLoad } from "../../utils/hooks/animations/useFadeInOnLoad";

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

  useFadeInOnLoad({
    refs: [itemsWrapperRef, textWrapperRef, navigationWrapperRef],
    options: {
      duration: 0.8,
      yOffset: 60,
      blurAmount: 10,
      stagger: 0.2,
    },
  });

  return (
    <div className="overflow-hidden pt-1">
      <div className="relative" ref={triggerRef}>
        <TemplateItemWrapper
          works={works}
          path={path}
          containerRef={containerRef}
          itemsWrapperRef={itemsWrapperRef}
        />
        <TemplateText
          work={works[currentIndex] || works[0]}
          path={path}
          textWrapperRef={textWrapperRef}
          titleRef={titleRef}
          subtitleRef={subtitleRef}
        />
        <TemplateNavigation
          works={works}
          currentIndex={currentIndex}
          onNavigate={scrollToItem}
          navigationWrapperRef={navigationWrapperRef}
        />
      </div>
    </div>
  );
};

export default TemplateSection;
