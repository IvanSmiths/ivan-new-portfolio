"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const Showreel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        triggerRef.current,
        {
          opacity: 1,
        },
        {
          ease: "none",
          opacity: 0,
          scrollTrigger: {
            markers: true,
            trigger: triggerRef.current,
            start: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            pin: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <video
        className="absolute bottom-0 right-0"
        ref={triggerRef}
        src="/videos/showreel-short.mp4"
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default Showreel;
