"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { FC, useRef } from "react";
import { bebas_neue } from "../../../utils/fonts";
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
          onEnter: () => {
            gsap.to(panel.querySelector("img"), {
              opacity: 1,
              duration: 0.5,
            });
            gsap.to(panel.querySelector(".description"), {
              opacity: 1,
              duration: 0.5,
            });
          },
          onLeaveBack: () => {
            gsap.to(panel.querySelector("img"), {
              opacity: 0,
              duration: 0.5,
            });
            gsap.to(panel.querySelector(".description"), {
              opacity: 0,
              duration: 0.5,
            });
          },
        });
      });
    },
    { scope: triggerRef },
  );

  return (
    <div className="my-section">
      <div ref={triggerRef} className="relative flex h-full w-full flex-col">
        {works.map((work: Works) => (
          <Link
            key={work.id}
            className="panel relative grid h-screen  w-full items-center justify-center bg-white dark:bg-dark"
            href={`works/${work.slug}`}
          >
            <h3
              className={`${bebas_neue.className} absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[19rem] font-bold leading-[15rem]`}
            >
              {work.company}
            </h3>
            <div className="z-20 col-start-5 col-end-9">
              <img
                className="h-[40rem] object-cover opacity-0"
                src={work.homeImage.url}
                alt={work.company}
                width={work.homeImage.width}
                height={work.homeImage.height}
              />
              <div className="description col-start-6 col-end-12 opacity-0">
                <h4 className="text-lg">{work.role}</h4>
                <p className="text-lg">{work.homeDescription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorksSection;
