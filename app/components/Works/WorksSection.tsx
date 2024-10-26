"use client";

import { FC, Key, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Works } from "../../../utils/graphql";
import Link from "next/link";

type WorkProps = {
  works: Works[];
};

const WorksSection: FC<WorkProps> = ({ works }) => {
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
          "#clsj5j1c7siwu0alfg7gm8kjk",
          {
            opacity: 0,
          },
          0.25,
        )
        .set(
          "#clsj5jsg5sh530ak4qcqekxm4",
          {
            opacity: 0,
          },
          0.4,
        );
    },
    { scope: perspectiveRef },
  );

  return (
    <div className="my-section">
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
          {works.map((work: Works, index: Key) => (
            <div
              id={work.id}
              className={work.class}
              key={index}
              style={{
                transform:
                  index === 1
                    ? "translate3d(0px, 0px, -10rem) translateY(-50%)"
                    : index === 2
                      ? "translate3d(0px, 0px, -20rem) translateY(-50%)"
                      : "translateY(-50%)",
              }}
            >
              <Link href={`works/${work.slug}`}>
                <h2 className="absolute bottom-small right-small rounded-sm bg-dark px-4 py-2 text-xs font-semibold text-white transition hover:bg-light hover:text-dark">
                  {work.company}
                </h2>
                <img
                  className="inline w-full rounded-md"
                  src={work.homeImage.url}
                  width={work.homeImage.width}
                  height={work.homeImage.height}
                  alt={work.company}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksSection;
