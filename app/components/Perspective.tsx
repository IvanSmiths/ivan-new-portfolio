"use client";

import Link from "next/link";
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
    class: "perspective-left",
  },
  {
    id: "second",
    text: "Lorem ipsum dolor sit amet",
    image: "project-2.jpg",
    class: "perspective-right",
  },
  {
    id: "third",
    text: "Lorem ipsum dolor sit amet",
    image: "project-3.jpg",
    class: "perspective-left third",
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
      <div className="spacer"></div>
      <div ref={triggerRef} className="perspective">
        <div ref={perspectiveRef} className="perspective-inner">
          {data.map((project: Project, index: number) => (
            <div key={index} id={project.id} className={project.class}>
              <img src={project.image} alt={project.text} />
              <div className="perspective-desc">
                <h2>{project.text}</h2>
                <Link href="/">
                  <span>Discover it</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
}

export default Perspective;
