"use client";

import { RefObject, useRef } from "react";
import useHorizontalScroll from "../../../utils/hooks/animations/useHorizontalScroll";
import AnimatedAccordion from "./Accordion";
import { AccordionItem, accordionItems } from "./AccordionItems";
import ExpertiseText from "./ExpertiseText";

const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll(
    containerRef as RefObject<HTMLDivElement>,
    triggerRef as RefObject<HTMLDivElement>,
  );

  return (
    <div>
      <div ref={triggerRef} className="h-screen w-full overflow-hidden">
        <div
          ref={containerRef}
          className="relative flex h-full w-fit items-center"
        >
          {accordionItems.map((item: AccordionItem, index: number) => (
            <AnimatedAccordion key={index} {...item} />
          ))}
          <ExpertiseText />
        </div>
      </div>
    </div>
  );
};

export default Expertise;
