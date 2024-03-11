import React from "react";
import Time from "./Time";
import FetchWeather from "./FetchWeather";

type Link = {
  title: string;
  url: string;
};

const links: Link[] = [
  {
    title: "GitHub",
    url: "https://github.com/IvanSmiths",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/ivan-fabbri/",
  },
  {
    title: "YouTube",
    url: "https://youtube.com/@ivansmiths",
  },
];

function Text() {
  return (
    <div className="grid">
      <div className="col-start-1 col-end-7 md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-7 md:pt-24 pt-12 flex flex-col gap-small">
        <h1 className="font-bold text-xl w-full">
          Frontend UI/UX developer with 3 years of experience. seeking the
          limit. currently at TD Cowen.
        </h1>
        <ul className="font-bold text-xl w-full flex gap-3 sm:gap-small">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="font-bold text-xl flex gap-3 sm:gap-small items-center w-full">
          <span>Wiesbaden (DE)</span>
          <Time />
          <FetchWeather />
        </div>
      </div>
    </div>
  );
}

export default Text;
