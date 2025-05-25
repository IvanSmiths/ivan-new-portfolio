"use client";

import { RefObject, useRef } from "react";
import { AnimatedWord } from "./AnimatedWord";
import { AnimatedImage } from "./AnimatedImage";
import { useScrollTextFill } from "../../../utils/hooks/animations/useScrollTextFill";
import { useAnimatedImages } from "../../../utils/hooks/animations/useAnimatedImages";

interface AnimatedTextWithImagesProps {
  words: string[];
  images: string[];
  triggerRef: RefObject<HTMLElement | null>;
  wordClassName?: string;
}

export const AnimatedTextWithImages = ({
  words,
  images,
  triggerRef,
}: AnimatedTextWithImagesProps) => {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { setImageRef } = useAnimatedImages();

  useScrollTextFill({
    refs: wordRefs.current,
    triggerRef: triggerRef,
  });

  let imageIndex = 0;

  return (
    <h2 className="lg:leading-4xl md:leading-2xl leading-xl flex flex-wrap justify-center gap-x-2 gap-y-4 text-center text-5xl font-black uppercase md:text-6xl lg:text-8xl">
      {words.map((word, index) => {
        if (word === " ") {
          const src = images[imageIndex++];
          return (
            <AnimatedImage key={index} refCallback={setImageRef} src={src} />
          );
        }

        return (
          <AnimatedWord
            key={`word-${index}`}
            word={word}
            setRef={(el) => {
              wordRefs.current[index] = el;
            }}
          />
        );
      })}
    </h2>
  );
};
