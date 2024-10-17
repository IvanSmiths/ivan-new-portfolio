"use client";

import { bebas_neue } from "../../../utils/fonts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import AnimatedAccordion from "./Accordion";

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
        <div
          ref={containerRef}
          className="relative flex h-full w-fit items-center"
        >
          <AnimatedAccordion
            title="Frontend"
            rotation={10}
            left={10}
            top={20}
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            openDirection="down"
          />
          <AnimatedAccordion
            title="Backend"
            rotation={-6}
            left={20}
            top={70}
            content="Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting."
            openDirection="up"
          />
          <AnimatedAccordion
            title="Design"
            rotation={8}
            left={40}
            top={20}
            content="Lorem Ipsum is simply dummy text of the printing and typesetting.Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's standard dummy"
            openDirection="down"
          />
          <AnimatedAccordion
            title="Testing"
            rotation={8}
            left={60}
            top={30}
            content="Lorem Ipsum is simply dummy text of the printing and typesetting.Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's standard dummy"
            openDirection="down"
          />
          <AnimatedAccordion
            title="3D Modeling"
            rotation={8}
            left={80}
            top={80}
            content="Lorem Ipsum is simply dummy text of the printing and typesetting.Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's standard dummy"
            openDirection="up"
          />
          <h2
            className={`${bebas_neue.className} cursor-default pt-14 text-[60rem] leading-[43rem] md:pt-32`}
          >
            Expertises
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
