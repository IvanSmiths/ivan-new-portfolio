import { FC } from "react";
import Social from "./Social";
import { LinkItem, socialLinks } from "../../../_config/config";
import { dm_mono } from "../../../utils/fonts";
import Logo from "../../home/Hero/TopHero/Logo";

const Footer: FC = () => {
  return (
    <footer className="px-sm pb-sm md:mt-5xl flex flex-col justify-end gap-2 md:min-h-[80vh]">
      <div className="mb-sm gap-sm flex flex-wrap">
        {socialLinks.map(({ label, url }: LinkItem) => (
          <Social key={label} label={label} url={url} />
        ))}
      </div>
      <div className="flex justify-between">
        <span className={`${dm_mono.className} text-xs uppercase`}>
          ©2025 Ivan Smiths
        </span>
        <span className={`${dm_mono.className} text-xs uppercase`}>
          Rocking Since 2020 💪
        </span>
      </div>
      <Logo />
    </footer>
  );
};

export default Footer;
