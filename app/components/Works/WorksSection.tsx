"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { createRef, FC, RefObject, useRef } from "react";
import { Works } from "../../../utils/graphql";
import Header from "../../crafts/components/Header";
import SingleWork from "./SingleWork";

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
              filter: "blur(0px)",
              duration: 0.5,
            });
          },
          onLeaveBack: () => {
            gsap.to(panel.querySelector("#description"), {
              opacity: 0,
              filter: "blur(40px)",
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
      <Header
        h1="Works"
        h2="All my works"
        paragraph="I'm a UI/UX Developer, and I love to create beautiful and functional designs. Here, you'll find a collection of my works, showcasing my skills and creativity."
      />
      {works.map((work: Works, index: number) => (
        <SingleWork key={work.id} work={work} ref={panelRefs.current[index]} />
      ))}
    </div>
  );
};

export default WorksSection;
