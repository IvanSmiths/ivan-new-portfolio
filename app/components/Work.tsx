/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";
import ButtonLink from "./ButtonLink";

function Work({ work, index }) {
  return (
    <div
      key={index}
      className="h-[100vh] w-[100vw] flex justify-center items-center"
    >
      <Link
        href={work.slug}
        className="w-2/3 h-2/3 relative p-small flex flex-col justify-between"
      >
        <img
          src={work.image}
          className="absolute left-1/2 top-1/2 h-full object-cover -translate-x-1/2 -translate-y-1/2 w-full"
          alt="image of work"
        />
        <div className="absolute left-1/2 top-1/2 h-full bg-[#00000066] -translate-x-1/2 -translate-y-1/2 w-full"></div>
        <img
          src={work.logo}
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
            <p className="pr-[50%] pt-small text-white">{work.paragraph}</p>
          </div>
          <div className="absolute right-0 bottom-0">
            <ButtonLink />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Work;
