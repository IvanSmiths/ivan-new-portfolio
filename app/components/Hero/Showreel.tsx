"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const Showreel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

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
            transform: "translate(50%, -90%)",
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
            scale: 1.7,
            ease: "none",
            duration: 1,
          },
          "-=0.5",
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
