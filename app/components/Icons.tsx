import { FC } from "react";
import IconGithub from "../globalComponents/IconGithub";
import IconLinkedin from "../globalComponents/IconLinkedin";
import IconYoutube from "../globalComponents/IconYoutube";

const Icons: FC = () => {
  return (
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
  );
};

export default Icons;
