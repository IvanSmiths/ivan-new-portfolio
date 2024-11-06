import { FC } from "react";
import Arrow from "./Arrow";

type SocialProps = {
  label: string;
  link: string;
  isInWorkPage?: boolean;
};

const Social: FC<SocialProps> = ({
  label,
  link,
  isInWorkPage,
}: SocialProps) => {
  return (
    <div
      className={`group flex cursor-pointer items-center gap-8 rounded-md border-2 border-dark px-6 py-3 hover:bg-dark dark:border-light dark:hover:bg-light ${
        isInWorkPage
          ? "w-full justify-between transition-all duration-500 hover:w-[60%] md:w-1/2"
          : "justify-center"
      }`}
    >
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
