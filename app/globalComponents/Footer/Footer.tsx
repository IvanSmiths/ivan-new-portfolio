import { FC } from "react";
import Logo from "../../globalComponents/Logo/Logo";
import Social from "./Social";

type SocialLink = {
  label: string;
  link: string;
};

const socialLinks: SocialLink[] = [
  { label: "Github", link: "https://github.com/IvanSmiths" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/ivan-fabbri" },
  { label: "YouTube", link: "https://youtube.com/@ivansmiths" },
  { label: "info@ivansmiths.com", link: "mailto:info@ivansmiths.com" },
];

const Footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      data-cy="footer"
      className="flex min-h-[70vh] flex-col justify-end gap-2 px-small pb-small md:min-h-[80vh]"
    >
      <div className="mb-medium flex flex-wrap gap-small gap-y-10">
        {socialLinks.map(({ label, link }) => (
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
