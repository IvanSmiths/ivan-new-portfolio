import { FC } from "react";
import Social from "./Social";
import { LinkItem, socialLinks } from "../../../_config/config";

const Footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      className="px-small pb-small md:mt-section flex flex-col justify-end gap-2 md:min-h-[80vh]"
    >
      <div className="mb-small gap-small flex flex-wrap gap-y-5 md:gap-y-10">
        {socialLinks.map(({ label, url }: LinkItem) => (
          <Social key={label} label={label} url={url} />
        ))}
      </div>
      <div className="flex justify-between">
        <span>©2025 Ivan Smiths</span>
        <span>Rocking Since 2020</span>
      </div>
    </footer>
  );
};

export default Footer;
