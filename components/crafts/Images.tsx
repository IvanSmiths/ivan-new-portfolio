"use client";

import { FC, useRef } from "react";
import { useImagesScroll } from "../../utils/hooks/animations/useImageScroll";

type Image = {
  desktopUrl: string;
  mobileUrl: string;
  alt: string;
  id: number;
  isHorizontal: boolean | null;
};

type ImagesProps = {
  images: Image[];
};

const Images: FC<ImagesProps> = ({ images }) => {
  const gridRef = useRef<HTMLElement | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapperRefs = useRef<{ [key: number]: (HTMLDivElement | null)[] }>(
    [0, 1, 2].reduce(
      (acc, columnIndex) => {
        const columnImages = images.filter(
          (_, index) => index % 3 === columnIndex,
        );
        acc[columnIndex] = columnImages.map(() => null);
        return acc;
      },
      {} as { [key: number]: (HTMLDivElement | null)[] },
    ),
  );

  useImagesScroll({
    gridRef,
    columnRefs,
    imageWrapperRefs,
  });

  return (
    <main
      className="columns lg:pt-3xl pt-sm mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-[1vw] lg:grid-cols-3"
      ref={gridRef}
    >
      {[0, 1, 2].map((columnIndex) => (
        <div
          className="column max-sm:p-sm gap-sm flex flex-col"
          key={columnIndex}
          ref={(el) => {
            columnRefs.current[columnIndex] = el;
          }}
        >
          {images
            .filter((_, index) => index % 3 === columnIndex)
            .map((image, index) => (
              <figure
                className={`animate-fadeInUp h-[600px] opacity-0 [animation-delay:${index + 1}00ms]`}
                key={index}
              >
                <div
                  className="column__item-imgwrap relative h-full w-full overflow-hidden"
                  ref={(el) => {
                    if (imageWrapperRefs.current[columnIndex]) {
                      imageWrapperRefs.current[columnIndex][index] = el;
                    }
                  }}
                >
                  <img
                    src={image.desktopUrl}
                    className="column__item-img absolute top-0 left-0 h-full w-full object-cover"
                    alt={image.alt}
                  />
                </div>
              </figure>
            ))}
        </div>
      ))}
    </main>
  );
};

export default Images;
