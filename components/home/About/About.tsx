"use client";

import { useRef } from "react";
import { useAnimatedImages } from "../../../utils/hooks/useAnimatedImages";
import { AnimatedImage } from "./AnimatedImage";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { setImageRef } = useAnimatedImages();

  return (
    <div
      ref={containerRef}
      className="py-3xl flex min-h-screen w-full items-center justify-center transition-colors"
    >
      <div className="flex w-8/12 items-center justify-center">
        <h2
          ref={textRef}
          className="leading-4xl text-center text-8xl font-black uppercase"
        >
          FROM{" "}
          <AnimatedImage
            refCallback={setImageRef}
            className="h-24 pb-4"
            src="https://res.cloudinary.com/deino2cjx/image/upload/v1747341876/portfolio/ideology/ideology-website-6_cfwfw2.jpg"
          />{" "}
          TOP TIER GLOBAL COMPANIES{" "}
          <AnimatedImage
            refCallback={setImageRef}
            className="h-24 pb-4"
            src="https://res.cloudinary.com/deino2cjx/image/upload/v1747341878/portfolio/ideology/ideology-website-9_jdwyyf.jpg"
          />{" "}
          TO LOCAL REALITIES, I GOT{" "}
          <AnimatedImage
            refCallback={setImageRef}
            className="h-24 pb-4"
            src="https://res.cloudinary.com/deino2cjx/image/upload/v1747341883/portfolio/ideology/racina_kpctx3.jpg"
          />{" "}
          YOUR BACK WITH DESIGN{" "}
          <AnimatedImage
            refCallback={setImageRef}
            className="h-24 pb-4"
            src="https://res.cloudinary.com/deino2cjx/image/upload/v1747341881/portfolio/ideology/lemon-soda-2_kuj5ha.jpg"
          />{" "}
          AND CODE AT MAXIMUM LEVEL.
        </h2>
      </div>
    </div>
  );
};

export default About;
