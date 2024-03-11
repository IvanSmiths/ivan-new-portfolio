import React from "react";
import Time from "./Time";
import FetchWeather from "./FetchWeather";
import IconGithub from "../globalComponents/IconGithub";
import IconLinkedin from "../globalComponents/IconLinkedin";
import IconYoutube from "../globalComponents/IconYoutube";

function Text() {
  return (
    <div className="grid">
      <div className="col-start-1 col-end-7 md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-7 md:pt-24 pt-12 flex flex-col gap-small">
        <h1 className="font-bold text-xl w-full">
          Frontend UI/UX developer with 3 years of experience. seeking the
          limit. currently at TD Cowen.
        </h1>
        <div className="font-bold text-xl flex gap-3 sm:gap-small items-center w-full">
          <span>Wiesbaden (DE)</span>
          <Time />
          <FetchWeather />
        </div>
        <ul className="flex gap-3 items-center sm:gap-8">
          <a
            href="https://github.com/IvanSmiths"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ivan-fabbri/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconLinkedin />
          </a>
          <a
            href="https://youtube.com/@ivansmiths"
            rel="noopener noreferrer"
            target="_blank"
          >
            <IconYoutube />
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Text;
