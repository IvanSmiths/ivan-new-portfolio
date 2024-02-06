import React, { FC, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const projects = [
  {
    name: "Project 1",
    image: "/images/td/mockup.jpg",
  },
  {
    name: "Project 2",
    image: "/images/suv/mockup.jpg",
  },
  {
    name: "Project 3",
    image: "/images/id/mockup.jpg",
  },
  {
    name: "Project 1",
    image: "/images/td/mockup.jpg",
  },
];

const InfiniteScroll: FC = () => {
  const test = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 1,
        end: "max",
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: 0.8,
          delay: 0,
          ease: "circ.out",
        },
        onLeaveBack: (self) => self.scroll(ScrollTrigger.maxScroll(window) - 2),
        onLeave: (self) => self.scroll(2),
      }).scroll(2);
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="flex justify-end" ref={test}>
        <div className="fixed h-full w-full"></div>
        <div className="w-[43%] flex items-end flex-col gap-medium pr-medium">
          {projects.map((project, index) => (
            <div
              ref={test}
              className="h-[100vh] flex justify-center flex-col gap-small"
              key={index}
            >
              <img
                className="w-full mix-blend-difference"
                src={project.image}
                alt=""
              />
              <h2>{project.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
