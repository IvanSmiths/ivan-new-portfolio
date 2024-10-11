"use client";

import React, { useRef } from "react";
import { bebas_neue } from "../../../utils/fonts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const firstRow = [
    { label: "I", id: "I" },
    { label: "Expertly", id: "Expertly" },
    { label: "Blend", id: "Blend" },
  ];
  const secondRow = [
    { label: "My", id: "My" },
    { label: "Design", id: "Design" },
    { label: "Background", id: "Background" },
    { label: "With", id: "With" },
  ];
  const thirdRow = [
    { label: "My", id: "My-2" },
    { label: "Development", id: "Development" },
    { label: "Skills.", id: "Skills" },
  ];

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000px",
          scrub: true,
          pin: true,
        },
      });

      timeline.to("#Expertly", {
        display: "block",
      });
      timeline.to("#Blend", {
        display: "block",
      });
      timeline.to("#My", {
        display: "block",
      });
      timeline.to("#Design", {
        display: "block",
      });
      timeline.to("#Background", {
        display: "block",
      });
      timeline.to("#With", {
        display: "block",
      });
      timeline.to("#My-2", {
        display: "block",
      });
      timeline.to("#Development", {
        display: "block",
      });
      timeline.to("#Skills", {
        display: "block",
      });
      timeline.to(["#Development", "#Skills"], {
        color: "#FF4D4D",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <div ref={triggerRef} className="grid h-screen w-full">
        <div className="col-start-1 col-end-7 flex flex-col items-center justify-center gap-x-small gap-y-0 md:col-start-2 md:col-end-12">
          <div className="flex flex-wrap items-center justify-center gap-x-small">
            {firstRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} ${index === 0 ? "block" : "hidden"} text-7xl md:text-8xl lg:text-9xl`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-small">
            {secondRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-7xl md:text-8xl lg:text-9xl`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-small">
            {thirdRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-7xl md:text-8xl lg:text-9xl`}
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
