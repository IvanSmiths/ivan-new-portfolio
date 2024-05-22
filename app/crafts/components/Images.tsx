import React, { FC } from "react";

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
  return (
    <div className="mt-small grid">
      <div className="col-span-full">
        <main className="col-span-full flex flex-wrap gap-small">
          {images.map((image: Image, index: number) => (
            <div
              key={index}
              className={`w-full flex-auto md:w-3/12 ${image.isHorizontal ? " md:w-[58.8%]" : ""}`}
            >
              <img
                src={image.desktopUrl}
                srcSet={`${image.desktopUrl} 2000w, ${image.mobileUrl} 1500w`}
                sizes="(min-width: 66em) 2000px, 1500px"
                fetchPriority={index < 4 ? "high" : "low"}
                loading={index > 4 ? "lazy" : "eager"}
                height="2000"
                width="3000"
                alt={image.alt}
                className="animate-fade-in h-full w-full rounded-lg object-cover object-center"
              />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Images;
