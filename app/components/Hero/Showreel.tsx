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
        width: "100%",
        ease: "sine.out",
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          end: "500px",
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div>
      <div ref={containerRef} className="relative h-full w-full">
        <div
          ref={triggerRef}
          className="absolute bottom-small right-small flex h-[800px] w-[30%] origin-bottom-right items-end pl-[40px]"
        >
          <video
            src="/videos/showreel-short.mp4"
            className="max-h-[100%] w-full rounded-xl border border-light object-cover dark:border-dark"
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
