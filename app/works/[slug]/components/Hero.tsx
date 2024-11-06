import { FC } from "react";
import Arrow from "../../../globalComponents/Footer/Arrow";

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
        <div className="group flex h-fit w-1/2 cursor-pointer items-center justify-between rounded-md border-2 border-dark p-5 transition-all duration-500 hover:w-[60%] hover:bg-dark dark:border-light dark:hover:bg-light">
          <a
            href={work.websiteLink}
            className="text-2xl transition group-hover:text-light dark:group-hover:text-dark md:text-8xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
          <Arrow />
        </div>
        <div className="group flex h-fit w-1/2 cursor-pointer items-center justify-between rounded-md border-2 border-dark p-5 transition-all duration-500 hover:w-[60%] hover:bg-dark dark:border-light dark:hover:bg-light">
          <a
            href={work.linkedinLink}
            className="text-2xl transition group-hover:text-light dark:group-hover:text-dark md:text-8xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <Arrow />
        </div>
      </div>
    </header>
  );
};

export default Hero;
