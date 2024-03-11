"use client";
/* eslint-disable @next/next/no-img-element */

import { FC, MutableRefObject, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Work from "./Work";

type WorkProps = {
  title: string;
  role: string;
  link: string;
  image: string;
};

const works: WorkProps[] = [
  {
    title: "TD Cowen",
    role: "UI/UX Developer",
    link: "/works/td-cowen",
    image: "/images/td/mockup.jpg",
  },
  {
    title: "Scholz & Volkmer",
    role: "Frontend developer",
    link: "/works/scholz-und-volkmer",
    image: "/images/suv/mockup.jpg",
  },
  {
    title: "Ideology",
    role: "UI/UX Designer",
    link: "/works/ideology-creative-studio",
    image: "/images/id/mockup.jpg",
  },
  {
    title: "TD Cowen",
    role: "UI/UX Developer",
    link: "/works/td-cowen",
    image: "/images/td/mockup.jpg",
  },
];

type WorksRefType = any;
type SetWorksRefType = any;

const InfiniteScroll: FC = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 1,
        end: "max",
        onLeaveBack: (self) => self.scroll(ScrollTrigger.maxScroll(window) - 2),
        onLeave: (self) => self.scroll(2),
      }).scroll(2);
    });
    return () => ctx.revert();
  }, []);

  const [worksRef, setWorksRef]: [WorksRefType, SetWorksRefType] =
    useArrayRef();

  function useArrayRef(): [MutableRefObject<any[]>, (ref: number) => void] {
    const worksRef = useRef<any[]>([]);
    worksRef.current = [];
    return [worksRef, (ref) => ref && worksRef.current.push(ref)];
  }

  return (
    <div className="grid">
      <div className="fixed h-full w-full"></div>
      <div className="flex md:col-start-2 md:col-end-12 col-start-1 col-end-7">
        <ul className="w-full flex flex-col gap-medium justify-center">
          {works.map((work, index) => (
            <Work
              key={index}
              title={work.title}
              link={work.link}
              img={work.image}
              role={work.role}
              setWorksRef={setWorksRef}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfiniteScroll;
