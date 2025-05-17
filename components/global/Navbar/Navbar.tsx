"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { dm_mono } from "../../../utils/fonts";
import { internalLinks, LinkItem } from "../../../_config/config";
import { usePathname } from "next/navigation";
import works from "../../../utils/pages/works";
import projects from "../../../utils/pages/projects";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="top-sm px-sm fixed z-10 flex w-full items-center justify-between">
      <Link href="/" className={`text-xs uppercase ${dm_mono.className}`}>
        Ivan Smiths
      </Link>

      <ul className="gap-md flex items-start">
        {internalLinks.map((link: LinkItem, index: number) => (
          <li className="flex" key={index}>
            <Link
              href={link.url}
              className={`flex text-xs uppercase ${dm_mono.className} ${
                pathname === link.url ? "underline underline-offset-2" : ""
              } ${index !== 1 && index !== 2 ? "mr-1" : ""}`}
            >
              {link.label}
            </Link>
            {index === 1 && (
              <span className="text-foreground-muted ml-1 text-[8px]">
                ({works.length + 1})
              </span>
            )}
            {index === 2 && (
              <span className="text-foreground-muted ml-1 text-[8px]">
                ({projects.length + 1})
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="flex w-24">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
