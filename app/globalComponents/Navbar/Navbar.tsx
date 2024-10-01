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
  Home = "Home",
  Works = "Works",
  Blog = "Blog",
  Crafts = "Crafts",
}

enum LinkUrl {
  Home = "/",
  Works = "/works",
  Blog = "/blog",
  Crafts = "/crafts",
}

type Links = {
  label: LinkLabel;
  url: LinkUrl;
  dataCy?: LinkLabel;
};

const internalLinks: Links[] = [
  { label: LinkLabel.Home, url: LinkUrl.Home, dataCy: LinkLabel.Home },
  { label: LinkLabel.Works, url: LinkUrl.Works, dataCy: LinkLabel.Works },
  { label: LinkLabel.Blog, url: LinkUrl.Blog, dataCy: LinkLabel.Blog },
  { label: LinkLabel.Crafts, url: LinkUrl.Crafts, dataCy: LinkLabel.Crafts },
];

const Navbar: FC<NavbarProps> = ({ position }) => {
  return (
    <nav data-testid="navbar">
      <div
        className={`${position === Position.Fixed ? "fixed h-fit" : "sm:sticky"} top-2 z-10 flex w-full flex-row-reverse items-start justify-between pl-small pr-small sm:flex-row`}
      >
        <ul className="flex items-start gap-small">
          {internalLinks.map((link: Links, index: number) => (
            <li key={index}>
              <Link
                data-cy={link.dataCy}
                href={link.url}
                className="lato text-xl font-semibold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-row-reverse items-start gap-small sm:flex-row md:gap-medium">
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
