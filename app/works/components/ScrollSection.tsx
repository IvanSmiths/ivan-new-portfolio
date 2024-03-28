"use client";
/* eslint-disable @next/next/no-img-element */

import { FC, Key } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Work from "../../components/Works/Work";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { WorkType } from "../../../utils/graphql";

type WorksProps = {
  works: {
    map: Function;
  };
};

const InfiniteScroll: FC<WorksProps> = ({ works }) => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0.1,
      end: () => ScrollTrigger.maxScroll(window) - 1,
      refreshPriority: -100,
      onLeave: (self) => {
        self.scroll(self.start + 1);
        ScrollTrigger.update();
      },
      onLeaveBack: (self) => {
        self.scroll(self.end - 1);
        ScrollTrigger.update();
      },
    });
  });

  return (
    <div className="grid">
      <div className="flex md:col-start-3 md:col-end-11 col-start-1 col-end-7">
        <ul className="w-full flex flex-col items-center justify-center">
          {works.map((work: WorkType, index: Key) => (
            <Work key={index} work={work} index={index} />
          ))}
          <div className="h-[100vh] w-[100vw] flex items-center">
            <div className="grid items-center w-full md:h-3/5 h-4/5">
              <div className="md:col-start-4 md:col-end-6 col-start-1 col-end-7 text-left md:text-right md:justify-between justify-end md:items-end right-auto flex flex-col w-full h-full">
                <Link href={works[0].slug}>
                  <h3 className="mono">{works[0].company}</h3>
                  <h4 className="font-bold text-4xl mt-1">{works[0].role}</h4>
                </Link>
                <h5 className="hidden sm:block">{works[0].homeDescription}</h5>
              </div>
              <Link
                href={works[0].slugHome}
                className="md:col-start-6 md:col-end-10 col-start-1 col-end-7 flex h-full w-full"
              >
                <img
                  src={works[0].homeImage.url}
                  height={works[0].homeImage.height}
                  width={works[0].homeImage.width}
                  loading="lazy"
                  className="h-full w-full object-cover rounded-md"
                  alt={`${works[0].company} work`}
                />
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default InfiniteScroll;
