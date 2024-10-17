"use client";

import { bebas_neue } from "../../../utils/fonts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import AnimatedAccordion from "./Accordion";

type AccordionItem = {
  title: string;
  rotation: number;
  left: number;
  top: number;
  content: string;
};

const accordionItems: AccordionItem[] = [
  {
    title: "Frontend",
    rotation: 10,
    left: 10,
    top: 20,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Backend",
    rotation: -6,
    left: 30,
    top: 60,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Design",
    rotation: 8,
    left: 45,
    top: 35,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Testing",
    rotation: -8,
    left: 60,
    top: 60,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "3D Modeling",
    rotation: 5,
    left: 80,
    top: 30,
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const Expertise = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

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
          translateX: () => `-${getScrollAmount()}px`,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            pin: true,
          },
        },
      );
    },
    { scope: triggerRef },
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
