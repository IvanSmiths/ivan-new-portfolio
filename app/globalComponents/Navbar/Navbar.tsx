import { FC } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export enum Position {
  Fixed = "fixed",
}

type NavbarProps = {
  position?: Position;
};

enum LinkLabel {
  Home = "home",
  Works = "works",
  Blog = "blog",
  Github = "github",
  Youtube = "youtube",
  Linkedin = "linkedin",
}

enum LinkUrl {
  Home = "/",
  Works = "/works",
  Blog = "/blog",
  Github = "https://github.com/IvanSmiths",
  Youtube = "https://www.youtube.com/channel/UCFX9mqUBAN-Qot0owXZhELA",
  Linkedin = "https://www.linkedin.com/in/ivan-fabbri/",
}

type Links = {
  label: LinkLabel;
  url: LinkUrl;
  dataCy?: LinkLabel;
};

const socials: Links[] = [
  { label: LinkLabel.Github, url: LinkUrl.Github },
  {
    label: LinkLabel.Linkedin,
    url: LinkUrl.Linkedin,
  },
  {
    label: LinkLabel.Youtube,
    url: LinkUrl.Youtube,
  },
];

const internalLinks: Links[] = [
  { label: LinkLabel.Home, url: LinkUrl.Home, dataCy: LinkLabel.Home },
  { label: LinkLabel.Works, url: LinkUrl.Works, dataCy: LinkLabel.Works },
  { label: LinkLabel.Blog, url: LinkUrl.Blog, dataCy: LinkLabel.Blog },
];

const Navbar: FC<NavbarProps> = ({ position }) => {
  return (
    <nav>
      <div
        className={`${position === Position.Fixed ? "fixed h-fit" : "sm:sticky"} top-2 w-full flex-row-reverse sm:flex-row pr-small pl-small z-10 flex justify-between items-start`}
      >
        <ul className="flex gap-small items-start">
          {internalLinks.map((link: Links, index: number) => (
            <li key={index}>
              <Link data-cy={link.dataCy} href={link.url} className="mono">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex md:gap-medium gap-small items-start flex-row-reverse sm:flex-row">
          <li>
            <a
              className="underline mono hidden sm:block"
              href="mailto:info@ivansmiths.com"
            >
              info@ivansmiths.com
            </a>
          </li>
          <li>
            <div className="flex flex-col gap-2">
              {socials.map((link: Links, index: number) => (
                <a
                  key={index}
                  className="mono underline"
                  href={link.url}
                  rel="noopener"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
