"use client";

import { dm_mono } from "../../../utils/fonts/fonts";
import { WorkProjectBase } from "../../../utils/data/types";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Marquee, MarqueeHandle } from "./Marquee";
import { useMarqueeAnimation } from "../../../utils/hooks/animations/useMarquee";

export type WorksProps = {
  works: WorkProjectBase[];
};

export default function Works({ works }: WorksProps) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>(works.map(() => null));
  const marqueeRefs = useRef<(MarqueeHandle | null)[]>(works.map(() => null));

  const { startMarquee, stopMarquee, cleanup } = useMarqueeAnimation();

  useGSAP(() => {
    const cleanupFunctions: (() => void)[] = [];

    works.forEach((_, index) => {
      const link = linkRefs.current[index];
      const marqueeHandle = marqueeRefs.current[index];

      if (!link || !marqueeHandle) return;

      const handleMouseEnter = () => {
        startMarquee(marqueeHandle);
      };

      const handleMouseLeave = () => {
        stopMarquee(marqueeHandle.container);
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach((fn) => fn());
      cleanup();
    };
  });

  return (
    <section className="px-sm py-4xl w-full">
      <h2
        className={`text-foreground ${dm_mono.className} pt-md text-xs uppercase underline underline-offset-2`}
      >
        <Link href="/works">All the works</Link>
      </h2>
      {works.map((work, index) => {
        return (
          <Link
            href={`/works/${work.slug}`}
            key={index}
            ref={(el) => {
              linkRefs.current[index] = el;
            }}
            className={`group border-background-muted hover:bg-foreground relative flex cursor-pointer items-start justify-center overflow-hidden border-b py-10 text-center transition ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <span
              className={`text-foreground-muted z-10 pt-1 text-xs uppercase group-hover:opacity-0 md:pt-4 ${dm_mono.className}`}
            >
              (0{index + 1})
            </span>

            <h3 className="relative inline-block text-5xl font-black uppercase group-hover:opacity-0 md:text-6xl lg:text-9xl">
              {work.name}
            </h3>

            <Marquee
              ref={(el) => {
                marqueeRefs.current[index] = el;
              }}
            >
              <span className="text-background mr-8 text-5xl uppercase md:text-6xl lg:text-9xl">
                {work.name}
              </span>
            </Marquee>
          </Link>
        );
      })}
    </section>
  );
}
