"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ButtonLink from "./ButtonLink";
import Link from "next/link";
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
            <div
              key={index}
              className="h-[100vh] w-[100vw] flex justify-center items-center"
            >
              <div className="w-2/3 h-2/3 relative p-small flex flex-col justify-between">
                <img
                  src={work.image}
                  className="absolute left-1/2 top-1/2 h-full object-cover -translate-x-1/2 -translate-y-1/2 w-full"
                  alt="image of work"
                />
                <Link
                  className="absolute left-1/2 top-1/2 h-full bg-[#00000066] -translate-x-1/2 -translate-y-1/2 w-full"
                  href={work.slug}
                ></Link>
                <img
                  src={work.logo}
                  alt="logo"
                  width="80"
                  height="80"
                  className="z-20 relative"
                />
                <div className="z-20 relative">
                  <div>
                    <h3 className="font-bold text-white heading-regular">
                      {work.company} <br />
                      {work.role}
                    </h3>
                    <p className="pr-[50%] pt-small text-white">
                      {work.paragraph}
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0">
                    <ButtonLink href={work.slug} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Works;
