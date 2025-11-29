"use client";

import { useRef } from "react";
import { AnimatedTextWithImages } from "./AnimatedTextWithImages";
import {
  animatedImages,
  animatedWords,
} from "../../../utils/data/home/about/textAndImages";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const About = () => {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="py-3xl flex w-full items-center justify-center"
    >
      <div className="max-sm:px-sm flex w-full items-center justify-center md:w-8/12">
        <AnimatedTextWithImages
          words={animatedWords}
          images={animatedImages}
          triggerRef={containerRef}
        />
      </div>
    </div>
  );
};

export default About;
