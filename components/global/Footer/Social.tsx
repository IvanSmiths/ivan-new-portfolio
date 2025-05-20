import { FC } from "react";
import Arrow from "./Arrow";
import { dm_mono } from "../../../utils/fonts";

type SocialProps = {
  label: string;
  url?: string;
};

const Social: FC<SocialProps> = ({ label, url }: SocialProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group border-foreground uppercase ${dm_mono.className} hover:bg-foreground hover:text-background border-foreground-muted flex cursor-pointer items-center gap-8 border p-4 text-2xl transition-all duration-300 md:text-6xl lg:text-7xl`}
    >
      {label}
      <Arrow />
    </a>
  );
};

export default Social;
