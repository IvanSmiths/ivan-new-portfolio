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
    <div key={index} className="h-[100vh] w-[100vw] flex items-center">
      <div className="grid items-center w-full h-3/5 text-right">
        <div className="col-start-4 col-end-6 justify-between items-end right-auto flex flex-col w-full h-full">
          <Link href={work.slugHome}>
            <h3 className="mono">{work.company}</h3>
            <h4 className="font-bold text-4xl mt-1">{work.role}</h4>
          </Link>
          <h5>{work.homeDescription}</h5>
        </div>
        <Link
          href={work.slugHome}
          className="col-start-6 col-end-10 flex h-full w-full"
        >
          <img
            src={work.homeImage.url}
            loading="lazy"
            className="h-full w-full object-cover rounded-md"
            alt={`${work.company} work`}
          />
        </Link>
      </div>
    </div>
  );
};

export default Work;
