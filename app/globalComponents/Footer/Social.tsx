import React, { FC } from "react";
import Arrow from "./Arrow";

type ButtonProps = {
  label: string;
  link: string;
};

const Social: FC<ButtonProps> = ({ label, link }) => {
  return (
    <div className="border-dark hover:bg-dark dark:hover:bg-light dark:border-light group flex cursor-pointer items-center justify-center gap-8 rounded-full border-2 px-8 py-3 transition">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="group-hover:text-light dark:group-hover:text-dark text-2xl transition md:text-6xl lg:text-8xl"
        href={link}
      >
        {label}
      </a>
      <Arrow />
    </div>
  );
};

export default Social;
