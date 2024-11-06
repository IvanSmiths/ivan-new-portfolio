"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FC, useRef } from "react";

const worksDoneList = [
  {
    label: "Adidas",
    link: "www.exampe.com",
  },
  {
    label: "Adidas",
    link: "www.exampe.com",
  },
  {
    label: "Adidas",
    link: "www.exampe.com",
  },
];

gsap.registerPlugin(ScrollTrigger);

const WorksDone: FC = () => {
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
          end: "3000px bottom",
          pin: true,
          scrub: true,
        },
      });
      timeline.to(worksRef.current, {
        left: "20px",
        duration: 1,
        ease: "power2.inOut",
      });
      timeline.to(
        doneRef.current,
        {
          right: "20px",
          duration: 1,
          ease: "power2.inOut",
        },
        "<",
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <div className="relative h-screen">
        <span
          ref={worksRef}
          className="absolute left-[31%] top-1/2 origin-left -translate-y-1/2 text-9xl"
        >
          Works
        </span>
        <span
          ref={doneRef}
          className="absolute right-[33%] top-1/2 origin-right -translate-y-1/2 text-9xl"
        >
          Done
        </span>
      </div>
    </div>
  );
};

export default WorksDone;
