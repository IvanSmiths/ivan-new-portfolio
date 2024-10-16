"use client";

import { bebas_neue } from "../../../utils/fonts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const Expertise = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const getScrollAmount = (): number | undefined => {
    let containerWidth = containerRef.current?.offsetWidth;
    let clientWidth = window.innerWidth;
    if (containerWidth) {
      return containerWidth - clientWidth;
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        {
          translateX: 0,
        },
        {
          ease: "none",
          translateX: () => `-${getScrollAmount()}px`,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            pin: true,
          },
        },
      );
    },
    { scope: triggerRef },
  );

  return (
    <div>
      <div ref={triggerRef} className="h-screen w-full overflow-hidden">
        <div ref={containerRef} className="flex h-full w-fit items-center">
          <h2
            className={`${bebas_neue.className} cursor-default text-[60rem] leading-[43rem]`}
          >
            Expertises
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
