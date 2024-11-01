"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { createRef, FC, RefObject, useRef } from "react";
import { bebas_neue } from "../../../utils/fonts";
import { Works } from "../../../utils/graphql";

type WorkProps = {
  works: Works[];
};

const WorksSection: FC<WorkProps> = ({ works }) => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<RefObject<HTMLAnchorElement>[]>(
    works.map(() => createRef<HTMLAnchorElement>()),
  );

  useGSAP(
    (): void => {
      panelRefs.current.forEach((panelRef, i) => {
        const panel = panelRef.current;
        if (!panel) return;

        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: i === panelRefs.current.length - 1 ? false : true,
          end: "bottom 100",
          pinSpacing: false,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(panel.querySelector("#description"), {
              opacity: 1,
              duration: 0.5,
            });
          },
          onLeaveBack: () => {
            gsap.to(panel.querySelector("#description"), {
              opacity: 0,
              duration: 0.5,
            });
          },
        });
      });
    },
    { scope: scopeRef },
  );

  return (
    <div ref={scopeRef} className="my-section h-fit w-full">
      {works.map((work: Works, index: number) => (
        <Link
          ref={panelRefs.current[index]}
          key={work.id}
          className="panel relative grid h-screen w-full items-center justify-center bg-light dark:bg-dark"
          href={`works/${work.slug}`}
        >
          <h3
            className={`${bebas_neue.className} absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-9xl font-bold md:text-[19rem] md:leading-[15rem]`}
          >
            {work.company}
          </h3>
          <div
            id="description"
            className="relative z-20 col-span-full opacity-0 md:col-start-5 md:col-end-9"
          >
            <div className="absolute inset-0 z-10 bg-black/50"></div>
            <div className="absolute bottom-small left-small z-20 pr-small text-light">
              <h4 className="pb-smallest text-xl font-bold">{work.role}</h4>
              <p className="text-lg">{work.homeDescription}</p>
            </div>
            <img
              className="relative h-[40rem] object-cover"
              src={work.homeImage.url}
              alt={work.company}
              width={work.homeImage.width}
              height={work.homeImage.height}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WorksSection;
