"use client";

import { useEffect, useRef } from "react";

function Works() {
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
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      },
    );
    return () => {
      pin.kill();
    };
  }, []);
  return (
    <div className="overflow-hidden">
      <div ref={triggerRef}>
        <div ref={scrollRef} className="h-[100vh] flex gap-small">
          <img src="/images/id/id-cover.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Works;
