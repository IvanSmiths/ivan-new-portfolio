import { FC } from "react";

const Arrow: FC = () => {
  return (
    <svg
      className="max-md:h-7 max-md:w-7"
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-dark transition group-hover:fill-light dark:fill-light dark:group-hover:fill-dark"
        d="M4.80241 57L0 52.1976L45.2555 6.89836H4.11257V0H57V52.8874H50.1016V11.7445L4.80241 57Z"
      />
    </svg>
  );
};

export default Arrow;
