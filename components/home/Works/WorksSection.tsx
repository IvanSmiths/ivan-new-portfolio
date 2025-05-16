"use client";

import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { FC, useRef } from "react";
import TemplateMapped from "../../works-projects/TemplateMapped";
import WorkText from "./WorkText";
import { WorkProjectBase } from "../../../utils/pages/types";
import { gsap } from "gsap";

type WorksSectionProps = {
  works: WorkProjectBase[];
};

const WorksSection: FC<WorksSectionProps> = ({ works }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    (): void => {
      const updateHeight = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", updateHeight);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `${scrollRef.current?.offsetHeight}px bottom`,
        pin: true,
        invalidateOnRefresh: true,
        scrub: true,
      });
      // @ts-ignore
      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={scrollRef}
      className="px-small pb-medium relative flex h-full flex-col items-center justify-center"
    >
      <div
        ref={containerRef}
        className="flex h-screen w-full items-center justify-center"
      >
        <WorkText />
      </div>
      <div className="gap-small flex h-full w-full flex-wrap">
        {works.map((work, index) => (
          <TemplateMapped work={work} key={index} index={index} isInHome />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
