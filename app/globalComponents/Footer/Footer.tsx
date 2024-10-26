import { FC } from "react";
import Logo from "../../globalComponents/Logo/Logo";
import Social from "./Social";
import { SocialLink, socialLinks } from "./FooterData";

const Footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      data-cy="footer"
      className="mt-section flex min-h-[70vh] flex-col justify-end gap-2 px-small pb-small md:min-h-[80vh]"
    >
      <div className="mb-medium flex flex-wrap gap-small gap-y-5 md:gap-y-10">
        {socialLinks.map(({ label, link }: SocialLink) => (
          <Social key={label} label={label} link={link} />
        ))}
      </div>
      <div className="flex justify-between">
        <span>©2024 Ivan Smiths</span>
        <span>Rocking Since 2020</span>
      </div>
      <Logo />
    </footer>
  );
};

export default Footer;
