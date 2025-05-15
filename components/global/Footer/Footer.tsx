import { FC } from "react";
import { SocialLink, socialLinks } from "./FooterData";
import Social from "./Social";
import Logo from "../Logo/Logo";

const Footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      className="flex flex-col justify-end gap-2 px-small pb-small md:mt-section md:min-h-[80vh]"
    >
      <div className="mb-small flex flex-wrap gap-small gap-y-5 md:gap-y-10">
        {socialLinks.map(({ label, link }: SocialLink) => (
          <Social key={label} label={label} link={link} />
        ))}
      </div>
      <div className="flex justify-between">
        <span>©2025 Ivan Smiths</span>
        <span>Rocking Since 2020</span>
      </div>
      <Logo />
    </footer>
  );
};

export default Footer;
