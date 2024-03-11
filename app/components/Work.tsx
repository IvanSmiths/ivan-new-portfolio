/* eslint-disable @next/next/no-img-element */

import { FC } from "react";
import Link from "next/link";
import ButtonLink from "./ButtonLink";

type WorkProps = {
  index: number;
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
      className="h-[100vh] w-[100vw] flex justify-center items-center"
    >
      <Link
        href={work.slugHome}
        className="w-4/5 sm:w-2/3 h-2/3 relative p-small flex flex-col justify-between"
      >
        <img
          src={work.homeImage.url}
          className="absolute left-1/2 top-1/2 h-full object-cover -translate-x-1/2 -translate-y-1/2 w-full"
          alt="image of work"
        />
        <div className="absolute left-1/2 top-1/2 h-full bg-[#00000066] -translate-x-1/2 -translate-y-1/2 w-full"></div>
        <img
          src={work.homeLogo.url}
          alt="logo"
          loading="lazy"
          width="80"
          height="80"
          className="z-20 relative"
        />
        <div className="z-20 relative">
          <div>
            <h3 className="font-bold text-white heading-regular">
              {work.company} <br />
              {work.role}
            </h3>
            <p className="pr-[50%] pt-small text-white">
              {work.homeDescription}
            </p>
          </div>
          <div className="absolute right-0 bottom-0">
            <ButtonLink />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Work;
