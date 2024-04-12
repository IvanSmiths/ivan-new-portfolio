import { FC } from "react";

type HeaderProps = {
  work: {
    company: string;
    homeImage: {
      url: string;
      height: number;
      width: number;
      fileName: string;
    };
  };
};

const Hero: FC<HeaderProps> = ({ work }) => {
  return (
    <>
      <h1 className="bebas md:mt-72 sm:mt-36 mt-14 col-span-full md:text-9xl text-6xl uppercase">
        {work.company}
      </h1>
      <img
        className="col-span-full w-full"
        src={work.homeImage.url}
        height={work.homeImage.height}
        width={work.homeImage.width}
        alt={work.homeImage.fileName}
      />
    </>
  );
};

export default Hero;
