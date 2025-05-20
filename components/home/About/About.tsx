"use client";

import { useRef } from "react";
import { useAnimatedImages } from "../../../utils/hooks/animations/useAnimatedImages";
import { AnimatedImage } from "./AnimatedImage";
import { useScrollTextFill } from "../../../utils/hooks/animations/useScrollTextFill";
import {
  animatedImages,
  animatedWords,
} from "../../../utils/pages/home/about/textAndImages";

const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { setImageRef } = useAnimatedImages();

  useScrollTextFill({
    refs: wordRefs.current,
    triggerRef: containerRef,
  });

  let imageIndex = 0;
  return (
    <div
      ref={containerRef}
      className="py-3xl flex min-h-screen w-full items-center justify-center transition-colors"
    >
      <div className="flex w-8/12 items-center justify-center">
        <h2 className="leading-4xl flex flex-wrap justify-center gap-x-2 gap-y-4 text-center text-8xl font-black uppercase">
          {animatedWords.map((word, index) => {
            if (word === " ") {
              const src = animatedImages[imageIndex++];
              return (
                <AnimatedImage
                  key={`img-${index}`}
                  refCallback={setImageRef}
                  className="h-24 pb-4"
                  src={src}
                />
              );
            }

            return (
              <span
                key={`word-${index}`}
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="mr-2 opacity-40"
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </div>
  );
};

export default About;
