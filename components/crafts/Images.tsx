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
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const columns = gridRef.current.querySelectorAll(".column");
    const columnElements = Array.from(columns);

    gsap.to(columnElements[1], {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "clamp(top bottom)",
        end: "clamp(bottom top)",
        scrub: true,
      },
    });

    columnElements.forEach((column, columnIndex) => {
      if (columnIndex === 1) return;

      const items = column.querySelectorAll(".column__item-imgwrap");
      items.forEach((wrapper) => {
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
      {[0, 1, 2].map((columnIndex, index) => (
        <div className="column flex flex-col gap-[1vw]" key={index}>
          {images
            .filter((_, index) => index % 3 === columnIndex)
            .map((image, index) => (
              <figure className="h-[600px]" key={index}>
                <div className="column__item-imgwrap relative h-full w-full overflow-hidden">
                  <img
                    src={image.desktopUrl}
                    className="column__item-img absolute top-0 left-0 h-full w-full object-cover"
                  ></img>
                </div>
              </figure>
            ))}
        </div>
      ))}
    </main>
  );
};

export default Images;
