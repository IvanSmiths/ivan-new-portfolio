import React, { FC } from "react";

type ButtonProps = {
  text: string;
  link: string;
};

const Social: FC<ButtonProps> = ({ text, link }) => {
  return (
    <div className="border-dark hover:bg-light dark:border-light group cursor-pointer rounded-full border-2 px-8 py-3 transition">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="group-hover:text-dark text-4xl md:text-6xl lg:text-8xl"
        href={link}
      >
        {text}
      </a>
    </div>
  );
};

export default Social;
