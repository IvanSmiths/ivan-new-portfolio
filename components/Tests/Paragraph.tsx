import React, { FC } from "react";

const Paragraph: FC = () => {
  return (
    <div className="grid fixed top-0 bg-secondary h-[10%]">
      <div className="flex flex-wrap justify-center grid-home-text-2 items-center">
        <p className="paragraph">
          Ivan Smiths - Frontend UI/UX Developer - 3 years of experience.
          Seeking the limit. Currently at
          <a
            className="paragraph"
            href="https://www.cowen.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            {" "}
            TD Cowen.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Paragraph;
