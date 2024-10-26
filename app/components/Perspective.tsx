"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export interface Project {
  text: string;
  image: string;
  id: string;
  class: string;
}

export const data: Project[] = [
  {
    id: "first",
    text: "Lorem ipsum dolor sit amet",
    image: "project-1.jpg",
    class: "absolute w-1/5 top-1/2 transition duration-100 left-[30%]",
  },
  {
    id: "second",
    text: "Lorem ipsum dolor sit amet",
    image: "project-2.jpg",
    class: "absolute w-1/5 top-1/2 transition duration-100 right-[30%]",
  },
  {
    id: "third",
    text: "Lorem ipsum dolor sit amet",
    image: "project-3.jpg",
    class: "absolute w-1/5 top-1/2 transition duration-100 left-[30%]",
  },
];

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
            snap: 1 / data.length,
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
        <div
          ref={perspectiveRef}
          className="relative h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {data.map((project: Project, index: number) => (
            <div
              id={project.id}
              className={project.class}
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
              <img
                className="inline w-full"
                src={project.image}
                alt={project.text}
              />
              <div className="perspective-desc">
                <h2 className="text-xl">{project.text}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Perspective;
