import React from "react";
import Time from "../../components/HomePage/Time";
import FetchWeather from "../../components/HomePage/FetchWeather";

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
      <div className="grid-home-text pt-medium flex gap-small flex-col">
        <div className="flex gap-small">
          <span className="font-bold w-96 text-xl text-right">TLDR</span>
          <h1 className="font-bold text-xl w-full">
            Frontend UI/UX developer with 3 years of experience. seeking the
            limit. currently at TD Cowen.
          </h1>
        </div>
        <div className="flex gap-small">
          <span className="w-96 text-right">Social</span>
          <ul className="font-bold text-xl w-full">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-small">
          <span className="w-96 text-right">Coding from</span>
          <ul className="font-bold text-xl flex flex-col gap-1 w-full">
            <li>Wiesbaden (DE)</li>
            <Time />
            <FetchWeather />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Text;