import { FC } from "react";
import Time from "./Time";
import IconGithub from "../globalComponents/IconGithub";
import IconLinkedin from "../globalComponents/IconLinkedin";
import IconYoutube from "../globalComponents/IconYoutube";
import FetchWeather from "./FetchWeather";

const Text: FC = () => {
  return (
    <div className="grid">
      <div className="col-start-1 col-end-7 sm:col-end-5  md:col-start-2 md:col-end-6 lg:col-start-3 lg:col-end-7 pt-24 flex flex-col gap-10 md:gap-small">
        <h1 className="font-bold text-xl w-full">
          Frontend UI/UX developer with 3 years of experience. seeking the
          limit. currently at TD Cowen.
        </h1>
        <div className="font-bold text-xl flex gap-3 sm:gap-small flex-wrap items-center w-full">
          <span className="text-primary-light">Wiesbaden (DE)</span>
          <Time />
          <FetchWeather />
        </div>
        <ul className="flex flex-wrap gap-9 items-center sm:gap-8">
          <li>
            <a
              href="https://github.com/IvanSmiths"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="github account"
            >
              <IconGithub />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/ivan-fabbri/"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="linkedin account"
            >
              <IconLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com/@ivansmiths"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="youtube channel"
            >
              <IconYoutube />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Text;
