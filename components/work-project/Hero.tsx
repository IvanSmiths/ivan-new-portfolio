import { FC } from "react";
import { WorkProjectPage } from "../../utils/pages/types";
import Social from "../global/Footer/Social";

type HeaderProps = {
  work: WorkProjectPage;
};

const Hero: FC<HeaderProps> = ({ work }) => {
  return (
    <header className="mt-small px-small md:mt-section flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl font-thin uppercase md:text-9xl">
        {work.name}
      </h1>
      <h2 className="mt-small text-center text-xl font-thin italic">
        {work.role} - ({work.date})
      </h2>
      <div className="mt-small md:mt-medium w-full md:h-[60rem]">
        <img
          className="h-full w-full rounded-md object-cover"
          src={work.homeImage.url}
          height={work.homeImage.height}
          width={work.homeImage.width}
          alt={work.homeImage.fileName}
        />
      </div>
      <div className="mt-small gap-small flex w-full flex-col transition-all duration-500 md:flex-row">
        <Social label="Website" isInWorkPage link={work.websiteLink} />
        <Social label="LinkedIn" isInWorkPage link={work.linkedinLink} />
      </div>
      <p className="mt-small text-left text-xl md:text-3xl">
        {work.description}
      </p>
    </header>
  );
};

export default Hero;
