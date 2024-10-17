"use client";

import { bebas_neue } from "../../../utils/fonts";
import { useRef } from "react";
import AnimatedAccordion from "./Accordion";
import { AccordionItem, accordionItems } from "./AccordionItems";
import useHorizontalScroll from "../../../utils/hooks/useHorizontalScroll";

const Expertise = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useHorizontalScroll(containerRef, triggerRef);

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
          <h2
            aria-label="Expertises section"
            className={`${bebas_neue.className} cursor-default pt-14 text-[60rem] leading-[43rem] md:pt-32`}
          >
            Expertises
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
