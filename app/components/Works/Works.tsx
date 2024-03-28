"use client";

import { FC, Key, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Work from "./Work";
import { useGSAP } from "@gsap/react";
import { useAnimationStore } from "../../../utils/store";
import { WorkType } from "../../../utils/graphql";

type WorksProps = {
  works: {
    map: Function;
  };
};

const Works: FC<WorksProps> = ({ works }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  const { slowest, normal } = useAnimationStore();

  const getScrollAmount = (): number | undefined => {
    let width = scrollRef.current?.offsetWidth;
    if (width) {
      return width - window.innerWidth;
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        scrollRef.current,
        {
          translateX: 0,
        },
        {
          ease: "none",
          duration: slowest,
          translateX: () => `-${getScrollAmount()}px`,
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
    <div className="overflow-hidden pt-medium">
      <div ref={triggerRef}>
        <div ref={scrollRef} className="h-[100vh] flex w-fit">
          {works.map((work: WorkType, index: Key) => (
            <Work key={index} work={work} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
