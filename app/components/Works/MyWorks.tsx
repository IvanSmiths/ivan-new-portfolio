"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { FC, useRef } from "react";

const MyWorks: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    (): void => {
      gsap.to(textRef.current, {
        scale: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "2000 bottom",
          scrub: 0.6,
          markers: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="h-screen w-full bg-red-500">
      <span ref={textRef} className="text-9xl">
        All My Works
      </span>
    </div>
  );
};

export default MyWorks;
