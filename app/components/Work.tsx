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
        className="w-full sm:w-8/12 md:w-[35rem] md:h-[35rem] h-2/3 relative p-small"
      >
        <img
          src={work.homeImage.url}
          loading="lazy"
          className="h-full w-full object-cover rounded-sm"
          alt={`${work.company} work`}
        />
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 h-fit">
          <h3 className="font-bold heading-regular">
            {work.role}
            <br />
            {work.company}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default Work;
