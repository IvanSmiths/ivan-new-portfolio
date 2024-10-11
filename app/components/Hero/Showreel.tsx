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
            className="max-h-[100%] w-full rounded-xl border border-light object-cover dark:border-dark"
            autoPlay
            loop
            muted
          >
            <source
              src="/videos/showreel-short.mp4"
              media="(min-width: 768px)"
              type="video/mp4"
            />
            <source
              src="/videos/showreel-short-mobile.mp4"
              media="(max-width: 767px)"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <a
            href="https://youtu.be/osf7rWGB9qw"
            target="_blank"
            rel="noreferrer noopener"
            className="absolute bottom-3 right-3 cursor-pointer rounded-full bg-dark px-4 py-2 text-xs font-semibold text-white transition hover:bg-light hover:text-dark"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default Showreel;
