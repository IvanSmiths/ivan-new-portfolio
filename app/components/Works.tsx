"use client";

/* eslint-disable @next/next/no-img-element */

import { Key, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Work from "./Work";
import { WorkType } from "../page";
import { useGSAP } from "@gsap/react";

function Works({ works }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      gsap.fromTo(
        scrollRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-200vw",
          ease: "none",
          duration: 2,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            scrub: 0.6,
            snap: {
              snapTo: 1 / 2,
              duration: 0.6,
              delay: 0,
              ease: "power1.inOut",
            },
            pin: true,
          },
        },
      );
    },
    { scope: triggerRef },
  );
  return (
    <div className="overflow-hidden pt-medium">
      <div ref={triggerRef}>
        <div ref={scrollRef} className="h-[100vh] flex w-[300vw]">
          {works.map((work: WorkType, index: Key | null | undefined) => (
            <Work key={index} work={work} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Works;
