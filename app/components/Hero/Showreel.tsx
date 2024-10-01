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
            scale: 1.9,
            ease: "none",
            duration: 1,
          },
          "-=0.5",
        )
        .fromTo(
          headingRef.current,
          {
            y: 20,
          },
          {
            y: -5,
            ease: "power1.inOut",
            duration: 1,
          },
        );
    },
    { scope: containerRef },
  );

  return (
    <div>
      <div className="relative h-full w-full">
        <div ref={containerRef} className="h-fit">
          <div
            ref={triggerRef}
            className="absolute w-[30%] origin-center pb-small"
          >
            <div
              ref={headingRef}
              className="flex w-full items-center justify-between"
            >
              <h3 className="lato text-sm font-semibold">
                Showreel works (2020 - 2024)
              </h3>
              <a
                href="https://youtu.be/osf7rWGB9qw"
                target="_blank"
                rel="noopener noreferrer"
                className="lato text-sm font-semibold"
              >
                View on YouTube
              </a>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute h-full w-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
              />
            </svg>
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
