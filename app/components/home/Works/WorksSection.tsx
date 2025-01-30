"use client";

import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { FC, useRef } from "react";
import Work from "../../../works/components/Work";
import WorkText from "./WorkText";
import { WorkBase } from "../../../../utils/graphql/graphqlTypes";

type WorksSectionProps = {
  works: WorkBase[];
};

const WorksSection: FC<WorksSectionProps> = ({ works }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      className="relative flex h-full flex-col items-center justify-center px-small pb-medium"
    >
      <div
        ref={containerRef}
        className="flex h-screen w-full items-center justify-center"
      >
        <WorkText />
      </div>
      <div className="flex h-full w-full flex-wrap gap-small">
        {works.map((work, index) => (
          <Work work={work} key={work.id} index={index} isInHome />
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
