"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { FC, useRef } from "react";
import { Works } from "../../../utils/graphql";

type WorkProps = {
  works: Works[];
};

const WorksSection: FC<WorkProps> = ({ works }) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    (): void => {
      let panels = gsap.utils.toArray<HTMLElement>(".panel");

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: i === panels.length - 1 ? false : true,
          end: "bottom 100",
          pinSpacing: false,
        });
      });
    },
    { scope: triggerRef },
  );

  return (
    <div className="my-section">
      <div ref={triggerRef} className="relative flex h-full w-full flex-col">
        {works.map((work: Works) => (
          <div
            id={work.id}
            className="panel relative flex h-screen w-full items-center justify-center bg-white dark:bg-dark"
            key={work.id}
          >
            <Link href={`works/${work.slug}`}>
              <h3 className="text-center text-7xl font-bold">{work.company}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksSection;
