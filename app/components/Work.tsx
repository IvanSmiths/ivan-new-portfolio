/* eslint-disable @next/next/no-img-element */

import { FC, Key } from "react";
import Link from "next/link";

type WorkProps = {
  index: Key | null | undefined;
  work: {
    slugHome: string;
    company: string;
    role: string;
    homeImage: {
      url: string;
    };
    homeLogo: {
      url: string;
    };
  };
};

const Work: FC<WorkProps> = ({ work, index }) => {
  return (
    <Link
      href={work.slugHome}
      className="h-[100vh] w-[100vw] flex items-center"
      key={index}
    >
      <div className="grid items-center w-full h-3/5 text-right">
        <div className="col-start-4 col-end-6 justify-between items-end right-auto flex flex-col w-full h-fit">
          <h3 className="font-bold text-4xl">{work.role}</h3>
          <h4 className="heading-regular lg:mt-small mt-2 lg:ml-1">
            {work.company}
          </h4>
        </div>
        <div className="col-start-6 col-end-10 flex h-full w-full">
          <img
            src={work.homeImage.url}
            loading="lazy"
            className="h-full w-full object-cover"
            alt={`${work.company} work`}
          />
        </div>
      </div>
    </Link>
  );
};

export default Work;
