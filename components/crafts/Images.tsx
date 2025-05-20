"use client";

import { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const gridRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (!gridRef.current) return;
    const middleColumn = columnRefs.current[1];
    if (middleColumn) {
      gsap.to(middleColumn, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "clamp(top bottom)",
          end: "clamp(bottom top)",
          scrub: true,
        },
      });
    }

    [0, 2].forEach((columnIndex) => {
      const columnWrappers = imageWrapperRefs.current[columnIndex] || [];

      columnWrappers.forEach((wrapper) => {
        if (!wrapper) return;

        gsap.to(wrapper, {
          rotation: columnIndex === 0 ? -3 : 3,
          xPercent: columnIndex === 0 ? -4 : 4,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.parentElement,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: true,
          },
        });
      });
    });
  }, []);

  return (
    <main
      className="columns mx-auto grid w-full max-w-[1400px] grid-cols-3 gap-[1vw] py-[20vh]"
      ref={gridRef}
    >
      {[0, 1, 2].map((columnIndex) => (
        <div
          className="column flex flex-col gap-[1vw]"
          key={columnIndex}
          ref={(el) => {
            columnRefs.current[columnIndex] = el;
          }}
        >
          {images
            .filter((_, index) => index % 3 === columnIndex)
            .map((image, index) => (
              <figure className="h-[600px]" key={index}>
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
