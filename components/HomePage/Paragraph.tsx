import { FC } from "react";

const Paragraph: FC = () => {
  return (
    <div className="flex flex-wrap items-center pb-small">
      <p className="heading-regular">
        Ivan Smiths - Frontend UI/UX Developer - 3 years of experience. Seeking
        the limit. Currently at
        <a
          className="heading-regular"
          href="https://www.cowen.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          {" "}
          TD Cowen.
        </a>
      </p>
    </div>
  );
};

export default Paragraph;
