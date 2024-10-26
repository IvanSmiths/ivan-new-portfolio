"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Works, works } from "./WorkData";

function Perspective() {
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    (): void => {
      gsap
        .timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "2000 bottom",
            scrub: 0.6,
            pin: true,
            snap: 1 / works.length,
          },
        })
        .to(perspectiveRef.current, {
          transform: "translate3d(0px, 0px, 35rem)",
        })
        .set(
          "#first",
          {
            opacity: 0,
          },
          0.25,
        )
        .set(
          "#second",
          {
            opacity: 0,
          },
          0.4,
        );
    },
    { scope: perspectiveRef },
  );

  return (
    <div>
      <div
        ref={triggerRef}
        style={{ perspective: "25rem" }}
        className="perspective relative h-screen w-full overflow-hidden"
      >
        <h2 className="absolute left-1/2 top-small block origin-center -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          All My Works
        </h2>
        <div
          ref={perspectiveRef}
          className="relative h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {works.map((work: Works, index: number) => (
            <div
              id={work.id}
              className={work.class}
              style={{
                transform:
                  index === 1
                    ? "translate3d(0px, 0px, -10rem) translateY(-50%)"
                    : index === 2
                      ? "translate3d(0px, 0px, -20rem) translateY(-50%)"
                      : "translateY(-50%)",
              }}
              key={index}
            >
              <img className="inline w-full" src={work.image} alt={work.text} />
              <div className="perspective-desc">
                <h2 className="text-xl">{work.text}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Perspective;
