import { FC } from "react";
import { bebas_neue } from "../../../../utils/fonts";

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
      <h1
        className={`${bebas_neue.className} col-span-full mt-14 text-6xl uppercase sm:mt-36 md:mt-72 md:text-9xl`}
      >
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
