import { FC } from "react";
import Social from "../../../globalComponents/Footer/Social";

type HeaderProps = {
  work: {
    company: string;
    date: string;
    websiteLink: string;
    linkedinLink: string;
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
    <header className="mt-section flex flex-col items-center justify-center px-small">
      <h1 className="text-center text-9xl font-thin uppercase">
        {work.company}
      </h1>
      <h2 className="mt-small text-center text-xl font-thin italic">
        ({work.date})
      </h2>
      <div className="mt-medium h-[60rem] w-full">
        <img
          className="h-full w-full object-cover"
          src={work.homeImage.url}
          height={work.homeImage.height}
          width={work.homeImage.width}
          alt={work.homeImage.fileName}
        />
      </div>
      <div className="mt-medium flex w-full gap-small transition-all duration-500">
        <Social label="Website" isInWorkPage link={work.websiteLink} />
        <Social label="LinkedIn" isInWorkPage link={work.linkedinLink} />
      </div>
    </header>
  );
};

export default Hero;
