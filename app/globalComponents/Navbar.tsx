import { FC } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export enum Position {
  FIXED = "fixed",
}

type NavbarProps = {
  position?: Position;
};

type Links = {
  name: string;
  url: string;
};

const links: Links[] = [
  { name: "github", url: "https://github.com/IvanSmiths" },
  { name: "linkedin", url: "https://www.linkedin.com/in/ivan-fabbri/" },
  {
    name: "youtube",
    url: "https://www.youtube.com/channel/UCFX9mqUBAN-Qot0owXZhELA",
  },
];

const Navbar: FC<NavbarProps> = ({ position }) => {
  return (
    <nav
      className={` ${position === Position.FIXED ? "fixed h-fit" : "sm:sticky"} top-2 w-full flex-row-reverse sm:flex-row pr-small pl-small z-10 flex justify-between items-start`}
    >
      <ul className="flex gap-small items-start">
        <li>
          <Link href="/" className="mono">
            Home
          </Link>
        </li>
        <li>
          <Link href="/works" className="mono">
            Works
          </Link>
        </li>
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
            {links.map((link, index) => (
              <a
                key={index}
                className="mono underline"
                href={link.url}
                rel="noopener"
                target="_blank"
              >
                {link.name}
              </a>
            ))}
          </div>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
