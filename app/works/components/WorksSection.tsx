"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FC, Key, useRef } from "react";
import { Works } from "../../../utils/graphql";
import { useAnimationStore } from "../../../utils/store";
import Work from "./Work";

type WorksProps = {
  works: Works[];
};

const WorksSection: FC<WorksProps> = ({ works }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

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
              snapTo: 1 / 2,
              duration: normal,
              delay: 0,
              ease: "power1.inOut",
            },
            pin: true,
          },
        },
      );
    },
    { scope: triggerRef },
  );

  return (
    <div className="overflow-hidden py-medium">
      <div ref={triggerRef}>
        <div ref={containerRef} className="flex h-screen w-fit gap-small">
          {works.map((work: Works, index: Key) => (
            <Work key={index} work={work} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksSection;
