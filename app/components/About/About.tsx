"use client";

import React, { useRef } from "react";
import { bebas_neue } from "../../../utils/fonts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

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

      timeline.to("#experctly", {
        display: "block",
      });
      timeline.to("#blend", {
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
            <span className={`${bebas_neue.className} text-9xl`}>I</span>
            <span
              id="experctly"
              className={`${bebas_neue.className} hidden text-9xl`}
            >
              Expertly
            </span>
            <span
              id="blend"
              className={`${bebas_neue.className} hidden text-9xl`}
            >
              Blend
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-small">
            <span className={`${bebas_neue.className} hidden text-9xl`}>
              My
            </span>
            <span className={`${bebas_neue.className} hidden text-9xl`}>
              Design
            </span>
            <span className={`${bebas_neue.className} hidden text-9xl`}>
              Background
            </span>
            <span className={`${bebas_neue.className} hidden text-9xl`}>
              With
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-small">
            <span className={`${bebas_neue.className} hidden text-9xl`}>
              My
            </span>
            <span className={`${bebas_neue.className} hidden text-9xl`}>
              Development
            </span>
            <span className={`${bebas_neue.className} hidden text-9xl`}>
              Skills.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
