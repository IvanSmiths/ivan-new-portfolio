import React, { FC } from "react";
import Arrow from "./Arrow";

type ButtonProps = {
  label: string;
  link: string;
};

const Social: FC<ButtonProps> = ({ label, link }) => {
  return (
    <div className="group flex cursor-pointer items-center justify-center gap-8 rounded-md border-2 border-dark px-6 py-3 transition hover:bg-dark dark:border-light dark:hover:bg-light">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl transition group-hover:text-light dark:group-hover:text-dark md:text-6xl lg:text-8xl"
        href={link}
      >
        {label}
      </a>
      <Arrow />
    </div>
  );
};

export default Social;
