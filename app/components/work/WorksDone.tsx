"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FC, useRef } from "react";

type WorksDoneProps = {
  works: { label: string; link: string }[];
};

gsap.registerPlugin(ScrollTrigger);
const WorksDone: FC<WorksDoneProps> = ({ works }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLSpanElement>(null);
  const doneRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    (): void => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `${scrollRef.current?.offsetHeight}px bottom`,
          pin: true,
          scrub: true,
        },
      });
      timeline.to(worksRef.current, {
        left: "0",
        transformOrigin: "left",
        scale: 0.3,
        ease: "power2.inOut",
      });
      timeline.to(
        doneRef.current,
        {
          right: "0",
          transformOrigin: "right",
          scale: 0.3,
          ease: "power2.inOut",
        },
        "<",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-small pb-medium"
      ref={scrollRef}
    >
      <div
        ref={containerRef}
        className="flex h-screen w-full items-center justify-between"
      >
        <div className="relative h-5 w-1/2">
          <span
            ref={worksRef}
            className="absolute right-0 top-1/2 origin-right -translate-y-1/2 text-4xl md:text-9xl"
          >
            Works
          </span>
        </div>
        <div className="relative h-5 w-1/2">
          <span
            ref={doneRef}
            className="absolute left-0 top-1/2 origin-left -translate-y-1/2 text-right text-4xl md:text-9xl"
          >
            Done
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-[30px] px-small pb-[40rem] pt-[60rem] md:gap-small">
        {works.map((work) => (
          <a
            href={work.link}
            key={work.label}
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 cursor-pointer text-center text-3xl md:text-8xl"
          >
            {work.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default WorksDone;
