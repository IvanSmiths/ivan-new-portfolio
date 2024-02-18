"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Work = {
  image: string;
};

function Works() {
  const works: Work[] = [
    {
      image: "/images/td/td-cover.png",
    },
    { image: "/images/suv/suv-cover.png" },
    { image: "/images/id/id-cover.png" },
  ];
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      scrollRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 2,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          markers: true,
          scrub: 0.6,
          snap: 1 / 2,
          pin: true,
        },
      },
    );
    return () => {
      pin.kill();
    };
  }, []);
  return (
    <div className="overflow-hidden pt-medium">
      <div ref={triggerRef}>
        <div ref={scrollRef} className="h-[100vh] flex w-[300vw]">
          {works.map((work, index) => (
            <div
              key={index}
              className="h-[100vh] w-[100vw] flex justify-center items-center"
            >
              <div className="w-1/2 h-1/2 relative">
                <img
                  src={work.image}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Works;
