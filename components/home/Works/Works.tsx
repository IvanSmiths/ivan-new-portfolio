"use client";

import { dm_mono } from "../../../utils/fonts/fonts";
import { WorkProjectBase } from "../../../utils/pages/types";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export type WorksProps = {
  works: WorkProjectBase[];
};

export default function Works({ works }: WorksProps) {
  const workRefs = useRef<
    Array<{
      link: HTMLAnchorElement | null;
      marquee: HTMLDivElement | null;
      marqueeText: HTMLDivElement | null;
      originalText: HTMLHeadingElement | null;
    }>
  >(
    works.map(() => ({
      link: null,
      marquee: null,
      marqueeText: null,
      originalText: null,
    })),
  );

  useGSAP(() => {
    workRefs.current.forEach((refs, index) => {
      const { link, marquee, marqueeText, originalText } = refs;

      if (!link || !marquee || !marqueeText || !originalText) return;

      let marqueeAnimation: gsap.core.Tween;

      const startMarquee = () => {
        const singleTextWidth =
          marqueeText.offsetWidth / marqueeText.children.length;
        const containerWidth = marquee.offsetWidth;
        const instancesNeeded = Math.ceil(containerWidth / singleTextWidth) + 2;

        const currentInstances = marqueeText.children.length;
        for (let i = currentInstances; i < instancesNeeded; i++) {
          const clone = marqueeText.children[0].cloneNode(true);
          marqueeText.appendChild(clone);
        }

        gsap.to(marquee, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        const speed = 150;
        const duration = singleTextWidth / speed;

        gsap.set(marqueeText, { x: 0 });
        marqueeAnimation = gsap.to(marqueeText, {
          x: -singleTextWidth,
          duration: duration,
          ease: "none",
          repeat: -1,
        });
      };

      const stopMarquee = () => {
        if (marqueeAnimation) {
          marqueeAnimation.kill();
        }
        gsap.to(marquee, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      link.addEventListener("mouseenter", startMarquee);
      link.addEventListener("mouseleave", stopMarquee);

      return () => {
        link.removeEventListener("mouseenter", startMarquee);
        link.removeEventListener("mouseleave", stopMarquee);
        if (marqueeAnimation) {
          marqueeAnimation.kill();
        }
      };
    });
  });

  return (
    <section className="px-sm py-4xl w-full">
      <h2
        className={`text-foreground-muted ${dm_mono.className} pb-md text-xs uppercase`}
      >
        Featured works
      </h2>
      {works.map((work, index) => {
        return (
          <Link
            href={`/works/${work.slug}`}
            key={index}
            ref={(el) => (workRefs.current[index].link = el)}
            className={`group border-background-muted hover:bg-foreground relative flex cursor-pointer items-start justify-center overflow-hidden border-b py-10 text-center transition ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <span
              className={`text-foreground-muted z-10 pt-1 text-xs uppercase group-hover:opacity-0 md:pt-4 ${dm_mono.className}`}
            >
              (0{index + 1})
            </span>

            <h3
              ref={(el) => (workRefs.current[index].originalText = el)}
              className="relative inline-block text-5xl uppercase group-hover:opacity-0 md:text-6xl lg:text-9xl"
            >
              {work.name}
            </h3>

            <div
              ref={(el) => (workRefs.current[index].marquee = el)}
              className="pointer-events-none absolute inset-0 flex items-center overflow-hidden opacity-0"
            >
              <div
                ref={(el) => (workRefs.current[index].marqueeText = el)}
                className="flex whitespace-nowrap"
              >
                <span className="text-background mr-8 text-5xl uppercase md:text-6xl lg:text-9xl">
                  {work.name}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
