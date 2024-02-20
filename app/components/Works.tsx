"use client";

/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Work from "./Work";
import { useGSAP } from "@gsap/react";

type Work = {
  image: string;
  logo: string;
  company: string;
  role: string;
  paragraph: string;
  slug: string;
};

function Works() {
  const works: Work[] = [
    {
      image: "/images/td/td-cover.png",
      logo: "/images/td/td-logo.jpeg",
      slug: "/works/td-cowen",
      company: "TD Cowen",
      role: "UI/UX Developer",
      paragraph:
        "Developing and designing features for one of the largest banks in the world's CRM using TypeScript/Angular.",
    },
    {
      image: "/images/suv/suv-cover.png",
      logo: "/images/suv/suv-logo.jpeg",
      slug: "/works/scholz-und-volkmer",
      company: "Scholz & Volkmer",
      role: "Frontend Developer",
      paragraph:
        "Coded visually stunning and web applications, leveraging technologies such as JavaScript, Next.js and Vue.",
    },
    {
      image: "/images/id/id-cover.png",
      logo: "/images/id/id-logo.jpeg",
      slug: "/works/ideology-creative-studio",
      company: "Ideology Creative Studio",
      role: "UI/UX Designer",
      paragraph:
        "Designed captivating digital experiences that elevate the company's brand",
    },
  ];

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
          {works.map((work, index) => (
            <Work key={index} work={work} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Works;
