"use client";

import { useRef } from "react";
import { AnimatedTextWithImages } from "./AnimatedTextWithImages";
import {
  animatedImages,
  animatedWords,
} from "../../../utils/pages/home/about/textAndImages";

const About = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="py-3xl flex min-h-screen w-full items-center justify-center transition-colors"
    >
      <div className="flex w-8/12 items-center justify-center">
        <AnimatedTextWithImages
          words={animatedWords}
          images={animatedImages}
          triggerRef={containerRef}
          textClassName="leading-4xl flex flex-wrap justify-center gap-x-2 gap-y-4 text-center text-8xl font-black uppercase"
          wordClassName="mr-2 opacity-40"
          imageClassName="h-24 pb-4"
        />
      </div>
    </div>
  );
};

export default About;
