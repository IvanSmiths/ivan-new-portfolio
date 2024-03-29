/* eslint-disable @next/next/no-img-element */

import { FC, Key } from "react";
import Link from "next/link";
import { WorkType } from "../../../utils/graphql";

type WorkProps = {
  work: WorkType;
  index: Key;
};

const Work: FC<WorkProps> = ({ work, index }) => {
  return (
    <div key={index} className="h-[100vh] w-[100vw] flex items-center">
      <div className="grid items-center w-full md:h-3/5 h-4/5">
        <div className="lg:col-start-4 md:col-start-3 md:col-end-6 col-start-1 col-end-7 text-left md:text-right md:justify-between justify-end md:items-end right-auto flex flex-col w-full h-full">
          <Link href={`works/${work.slug}`}>
            <h3 className="mono">{work.company}</h3>
            <h4 className="font-bold text-4xl mt-1">{work.role}</h4>
          </Link>
          <h5 className="hidden sm:block">{work.homeDescription}</h5>
        </div>
        <Link
          href={`works/${work.slug}`}
          className="lg:col-end-10 md:col-start-6 md:col-end-11 col-start-1 col-end-7 flex h-full w-full"
        >
          <img
            src={work.homeImage.url}
            height={work.homeImage.height}
            width={work.homeImage.width}
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
