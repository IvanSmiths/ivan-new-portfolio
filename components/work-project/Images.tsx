"use client";

import { useRef } from "react";
import { WorkProjectPage } from "../../utils/data/types";
import { useFadeInOnLoad } from "../../utils/hooks/animations/useFadeInOnLoad";

type HeaderProps = {
  work: WorkProjectPage;
};

const Images = ({ work }: HeaderProps) => {
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const refsAsRefObjects = useRef(
    work.images.map((_, i) => ({
      get current() {
        return imageRefs.current[i] || null;
      },
    })),
  );

  const setRef = (index: number) => (el: HTMLImageElement | null) => {
    imageRefs.current[index] = el;
  };

  useFadeInOnLoad({
    refs: refsAsRefObjects.current,
    options: {
      duration: 0.6,
      yOffset: 40,
      blurAmount: 10,
      stagger: 0.05,
    },
  });

  return (
    <div className="pt-sm w-full">
      <ul className="gap-sm flex w-full flex-col">
        {work.images.map((image, index) => (
          <li key={index} className="w-full">
            <img
              ref={setRef(index)}
              alt={`work number ${index}`}
              className="h-full"
              src={image}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Images;
