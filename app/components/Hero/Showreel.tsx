"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const Showreel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        triggerRef.current,
        {
          bottom: "20px",
          right: "20px",
          transform: "translate(0, 0)",
        },
        {
          ease: "none",
          bottom: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
          scrollTrigger: {
            markers: true,
            trigger: containerRef.current,
            start: "bottom bottom",
            end: "1000px",
            scrub: 0.6,
            pin: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div>
      <div ref={containerRef} className="relative h-full w-full">
        <div ref={triggerRef} className="absolute origin-center">
          <video src="/videos/showreel-short.mp4" autoPlay loop muted />
        </div>
      </div>
    </div>
  );
};

export default Showreel;
