import { dm_mono } from "../../../utils/fonts";
import { LinkItem, socialLinks } from "../../../_config/config";
import SquareArrowOutUpRight from "../Icons/SquareArrowOutUpRight";

const Social = () => {
  return (
    <div className="mb-sm gap-sm flex flex-wrap">
      {socialLinks.map(({ label, url }: LinkItem) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group border-foreground uppercase ${dm_mono.className} hover:bg-foreground hover:text-background border-foreground-muted flex cursor-pointer items-center gap-8 border p-4 text-2xl transition-all duration-300 md:text-6xl lg:text-7xl`}
        >
          {label}
          <SquareArrowOutUpRight dimensions={50} />
        </a>
      ))}
    </div>
  );
};

export default Social;
