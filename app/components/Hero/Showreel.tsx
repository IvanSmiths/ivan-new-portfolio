"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const Showreel = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.to(triggerRef.current, {
        ease: "none",
        bottom: "50%",
        right: "50%",
        scrollTrigger: {
          markers: true,
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "1000px",
          scrub: 0.6,
          invalidateOnRefresh: true,
          pin: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div>
      <div ref={containerRef}>
        <div ref={triggerRef} className="absolute bottom-small right-small">
          <video
            className=""
            src="/videos/showreel-short.mp4"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
};

export default Showreel;
