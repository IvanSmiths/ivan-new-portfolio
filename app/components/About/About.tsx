"use client";

import React, { useRef } from "react";
import { bebas_neue } from "../../../utils/fonts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type RowElement = {
  label: string;
  id: string;
};

const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const firstRow: RowElement[] = [
    { label: "I", id: "I" },
    { label: "Expertly", id: "Expertly" },
    { label: "Blend", id: "Blend" },
  ];

  const secondRow: RowElement[] = [
    { label: "My", id: "My" },
    { label: "Design", id: "Design" },
    { label: "Background", id: "Background" },
    { label: "With", id: "With" },
  ];

  const thirdRow: RowElement[] = [
    { label: "My", id: "My-2" },
    { label: "Development", id: "Development" },
    { label: "Skills.", id: "Skills" },
  ];

  gsap.registerPlugin(useGSAP);

  useGSAP(
    (): void => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2500px",
          scrub: true,
          pin: true,
        },
      });

      const elementIDs: string[] = [
        "#Expertly",
        "#Blend",
        "#My",
        "#Design",
        "#Background",
        "#With",
        "#My-2",
        "#Development",
        "#Skills",
      ];

      timeline.add("start");

      elementIDs.forEach((id: string): void => {
        timeline.to(id, { display: "block", opacity: 1, filter: "blur(0px)" });
      });

      timeline.to(["#Development", "#Skills"], { color: "#199B93" });
      timeline.to(
        "#widthDiv",

        { width: "100%", duration: 5 },
        "start",
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <div ref={triggerRef} className="relative grid h-screen w-full">
        <div
          id="widthDiv"
          className="absolute bottom-0 left-0 h-full w-0 bg-dark dark:bg-light"
        ></div>
        <div className="col-start-1 col-end-7 flex flex-col items-center justify-center gap-x-small gap-y-0 md:col-start-2 md:col-end-12">
          <div className="flex flex-wrap items-center justify-center gap-x-small">
            {firstRow.map(({ label, id }: RowElement, index: number) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} ${index === 0 ? "block" : "hidden opacity-0 blur-2xl"} text-7xl mix-blend-difference  md:text-8xl lg:text-[9rem]`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-small">
            {secondRow.map(({ label, id }: RowElement, index: number) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-7xl opacity-0 mix-blend-difference blur-2xl md:text-8xl lg:text-[9rem]`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-small">
            {thirdRow.map(({ label, id }: RowElement, index: number) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-7xl opacity-0 mix-blend-difference blur-2xl md:text-8xl lg:text-[9rem]`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
