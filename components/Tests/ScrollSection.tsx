import React, { FC, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const projects = [
  {
    name: "Project 1",
    image: "/images/td/td-website-1.png",
  },
  {
    name: "Project 2",
    image: "/images/suv/suv-website-1.png",
  },
  {
    name: "Project 3",
    image: "/images/id/id-website-1.png",
  },
  {
    name: "Project 1",
    image: "/images/td/td-website-1.png",
  },
];

const InfiniteScroll: FC = () => {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-100vw",
          ease: "none",
          duration: 0.5,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=15000 bottom",
            markers: true,
            scrub: 0.6,
            pin: true,
            onLeaveBack: (self) =>
              self.scroll(ScrollTrigger.maxScroll(window) - 2),
            onLeave: (self) => self.scroll(2),
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      <div ref={triggerRef} className="">
        <div ref={containerRef} className="flex gap-24">
          {projects.map((project, index) => (
            <img width="800px" key={index} src={project.image} alt="" />
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
