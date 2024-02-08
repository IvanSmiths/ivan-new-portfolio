import React, { FC, useEffect } from "react";
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
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 1,
        end: "max",
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: 1,
          delay: 0.6,
          ease: "circ.out",
        },
        onLeaveBack: (self) => self.scroll(ScrollTrigger.maxScroll(window) - 2),
        onLeave: (self) => self.scroll(2),
      }).scroll(2);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="grid">
      <div className="fixed h-full w-full"></div>
      <div className="flex grid-home-works">
        <ul className="w-full flex flex-col justify-center gap-medium">
          {projects.map((project, index) => (
            <li
              className="h-[100vh] flex justify-center flex-col gap-small"
              key={index}
            >
              <img
                className="w-[100%] rounded-lg h-[70%] object-cover"
                src={project.image}
                alt=""
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfiniteScroll;
