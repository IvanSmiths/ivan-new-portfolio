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
  textClassName?: string;
  wordClassName?: string;
  imageClassName?: string;
}

export const AnimatedTextWithImages = ({
  words,
  images,
  triggerRef,
  textClassName = "",
  wordClassName = "",
  imageClassName = "",
}: AnimatedTextWithImagesProps) => {
  const wordRefs = useRef([]);
  const { setImageRef } = useAnimatedImages();

  useScrollTextFill({
    refs: wordRefs.current,
    triggerRef: triggerRef,
  });

  let imageIndex = 0;

  return (
    <h2 className={textClassName}>
      {words.map((word, index) => {
        if (word === " ") {
          const src = images[imageIndex++];
          return (
            <AnimatedImage
              key={`img-${index}`}
              refCallback={setImageRef}
              className={imageClassName}
              src={src}
            />
          );
        }

        return (
          <AnimatedWord
            key={`word-${index}`}
            word={word}
            setRef={(el) => {
              wordRefs.current[index] = el;
            }}
            className={wordClassName}
          />
        );
      })}
    </h2>
  );
};
