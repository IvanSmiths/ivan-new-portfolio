"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const Showreel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "1000px",
          scrub: 0.6,
          pin: true,
          markers: true,
        },
      });

      timeline
        .fromTo(
          triggerRef.current,
          {
            bottom: "20px",
            right: "20px",
            transform: "translate(0, 0)",
          },
          {
            bottom: "50%",
            right: "50%",
            transform: "translate(50%, -75%)",
            ease: "none",
            duration: 1,
          },
        )
        .fromTo(
          triggerRef.current,
          {
            scale: 1,
          },
          {
            scale: 1.8,
            ease: "none",
            duration: 1,
          },
          "-=0.5",
        )
        .fromTo(
          headingRef.current,
          {
            y: 0,
          },
          {
            y: 20,
            duration: 1,
          },
        );
    },
    { scope: containerRef },
  );

  return (
    <div>
      <div className="relative h-[100rem] w-full">
        <div ref={containerRef} className="h-fit">
          <div
            ref={triggerRef}
            className="absolute w-[30%] origin-center pb-small"
          >
            <div
              ref={headingRef}
              className="absolute z-10 h-5 w-80 bg-secondary transition"
            ></div>
            <h3 className="lato text-sm font-semibold">
              Showreel works (2020 - 2024)
            </h3>
            <video
              src="/videos/showreel-short.mp4"
              className="relative z-20"
              autoPlay
              loop
              muted
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showreel;
