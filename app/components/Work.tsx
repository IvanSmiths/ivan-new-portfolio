/* eslint-disable @next/next/no-img-element */

import { FC, Key } from "react";
import Link from "next/link";

type WorkProps = {
  index: Key | null | undefined;
  work: {
    slugHome: string;
    company: string;
    role: string;
    homeDescription: string;
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
    <div
      key={index}
      className="h-[100vh] w-[100vw] px-5 sm:p-0 flex justify-center items-center"
    >
      <Link
        href={work.slugHome}
        className="w-full sm:w-8/12 md:w-[40rem] md:h-[30rem] h-2/3 relative flex justify-center lg:items-center flex-col p-small"
      >
        <img
          src={work.homeImage.url}
          loading="lazy"
          className="h-full w-full lg:w-10/12 lg:h-10/12 object-cover rounded-sm"
          alt={`${work.company} work`}
        />
        <div className="lg:absolute lg:top-1/2 lg:-left-60 lg:-translate-y-1/2 static h-fit">
          <h3 className="font-bold heading-large mt-5 lg:mt-0">{work.role}</h3>
          <h4 className="heading-regular lg:mt-small mt-2 lg:ml-1">
            {work.company}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default Work;
