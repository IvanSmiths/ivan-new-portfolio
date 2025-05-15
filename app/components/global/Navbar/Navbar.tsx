import Link from "next/link";
import { FC } from "react";
import ThemeToggle from "./ThemeToggle";

export enum Position {
  Fixed = "fixed",
}

type NavbarProps = {
  position?: Position;
};

enum LinkItem {
  Home = "Home",
  Works = "Works",
  Projects = "Projects",
  Blog = "Blog",
  Crafts = "Crafts",
}

enum LinkUrl {
  Home = "/",
  Works = "/works",
  Projects = "/projects",
  Blog = "/blog",
  Crafts = "/crafts",
}

type Links = {
  label: LinkItem;
  url: LinkUrl;
  dataCy?: Lowercase<LinkItem>;
};

const internalLinks: Links[] = [
  { label: LinkItem.Home, url: LinkUrl.Home, dataCy: "home" },
  { label: LinkItem.Works, url: LinkUrl.Works, dataCy: "works" },
  { label: LinkItem.Projects, url: LinkUrl.Projects, dataCy: "projects" },
  { label: LinkItem.Blog, url: LinkUrl.Blog, dataCy: "blog" },
  { label: LinkItem.Crafts, url: LinkUrl.Crafts, dataCy: "crafts" },
];

const Navbar: FC<NavbarProps> = ({ position }) => {
  return (
    <nav data-testid="navbar">
      <div
        className={`${position === Position.Fixed ? "fixed h-fit" : "sm:sticky"} top-2 z-10 hidden w-full flex-row-reverse items-start justify-between pl-small pr-small sm:flex-row md:flex`}
      >
        <ul className="flex items-start gap-small">
          {internalLinks.map((link: Links, index: number) => (
            <li key={index}>
              <Link
                href={link.url}
                className="text-md font-semibold mix-blend-screen sm:text-xl"
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
