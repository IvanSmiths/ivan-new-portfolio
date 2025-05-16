import { FC } from "react";
import Arrow from "./Arrow";

type SocialProps = {
  label: string;
  link?: string;
  isInWorkPage?: boolean;
};

const Social: FC<SocialProps> = ({
  label,
  link,
  isInWorkPage,
}: SocialProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group border-dark hover:bg-dark hover:text-dark dark:border-light dark:hover:bg-light dark:hover:text-dark flex cursor-pointer items-center gap-8 rounded-md border-2 px-6 py-3 text-2xl transition-all duration-300 md:text-6xl lg:text-8xl ${
        isInWorkPage
          ? "w-full justify-between hover:w-[60%] md:w-1/2"
          : "justify-center"
      }`}
    >
      {label}
      <Arrow />
    </a>
  );
};

export default Social;
