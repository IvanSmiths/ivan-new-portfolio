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
      <h1 className="bebas mt-96 col-start-1 col-end-13 md:text-9xl text-8xl uppercase">
        {work.company}
      </h1>
      <img
        className="col-start-1 col-end-13 w-full"
        src={work.homeImage.url}
        height={work.homeImage.height}
        width={work.homeImage.width}
        alt={work.homeImage.fileName}
      />
    </>
  );
};

export default Hero;
