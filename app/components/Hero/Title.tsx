import { FC } from "react";

const Title: FC = () => {
  return (
    <div className="col-start-1 col-end-8 my-medium md:mb-small">
      <h1 className="sm:text-4xl text-xl">
        UI/UX Developer with 3 years of experience. Seeking the limit. Currently
        at {""}
        <a
          href="https://www.linkedin.com/company/td-cowen/"
          target="_blank"
          className="underline underline-offset-4 sm:text-4xl text-xl"
        >
          TD Cowen.
        </a>
      </h1>
    </div>
  );
};

export default Title;
