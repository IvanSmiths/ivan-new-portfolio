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
    { label: "My", id: "4" },
    { label: "Design", id: "5" },
    { label: "Background", id: "6" },
    { label: "With", id: "7" },
  ];
  const thirdRow = [
    { label: "My", id: "8" },
    { label: "Development", id: "9" },
    { label: "Skills.", id: "10" },
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
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <div ref={triggerRef} className="grid h-screen w-full bg-brand">
        <div className="col-start-2 col-end-12 flex flex-col items-center justify-center gap-x-small gap-y-0 bg-red-900">
          <div className="flex flex-wrap items-center gap-small">
            {firstRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} ${index === 0 ? "block" : "hidden"} text-9xl`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-small">
            {secondRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-9xl`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-small">
            {thirdRow.map(({ label, id }, index) => (
              <span
                key={index}
                id={id}
                className={`${bebas_neue.className} hidden text-9xl`}
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
