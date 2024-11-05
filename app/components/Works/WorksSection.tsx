"use client";

import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { FC, useRef } from "react";
import { Works } from "../../../utils/graphql";
import WorkText from "./WorkText";

type WorksSectionProps = {
  works: Works[];
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
        markers: true,
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
      className="relative flex h-full flex-col items-center justify-center px-small"
    >
      <div
        ref={containerRef}
        className="flex h-screen w-full items-center justify-center"
      >
        <WorkText />
      </div>
      <div className="flex h-full w-full flex-wrap gap-small">
        {works.map((work) => (
          <div className="z-10 w-[calc(50%-10px)]" key={work.id}>
            <img
              className="h-full w-full object-cover"
              src={work.homeImage.url}
              height={work.homeImage.height}
              width={work.homeImage.width}
              alt={work.company}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
