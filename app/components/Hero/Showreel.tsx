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
          paddingBottom: 0,
          transform: "translate(50%, -90%)",
          scale: 1.7,
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
      <div className="relative h-[100rem] w-full">
        <div ref={containerRef} className="h-fit">
          <div
            ref={triggerRef}
            className="absolute w-[30%] origin-center pb-small"
          >
            <video src="/videos/showreel-short.mp4" autoPlay loop muted />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showreel;
