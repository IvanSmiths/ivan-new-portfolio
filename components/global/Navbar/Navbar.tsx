"use client";

import Link from "next/link";
import { FC } from "react";
import ThemeToggle from "./ThemeToggle";
import { dm_mono } from "../../../utils/fonts";
import { internalLinks, Links } from "../../../_config/config";
import { usePathname } from "next/navigation";

export enum Position {
  Fixed = "fixed",
}

type NavbarProps = {
  position?: Position;
};

const Navbar: FC<NavbarProps> = ({ position }) => {
  const pathname = usePathname();

  return (
    <nav data-testid="navbar">
      <div
        className={`${
          position === Position.Fixed ? "fixed h-fit" : "sm:sticky"
        } pl-small pr-small top-2 z-10 hidden w-full flex-row-reverse items-start justify-between sm:flex-row md:flex`}
      >
        <Link href="/" className={`text-xs uppercase ${dm_mono.className}`}>
          Ivan Smiths
        </Link>

        <ul className="gap-md flex items-start">
          {internalLinks.map((link: Links, index: number) => (
            <li key={index}>
              <Link
                href={link.url}
                className={`flex text-xs uppercase ${dm_mono.className} ${
                  pathname === link.url ? "underline underline-offset-2" : ""
                } ${index !== 1 && index !== 2 ? "mr-1" : ""}`}
              >
                {link.label}
                {index === 1 && (
                  <span className="text-foreground-muted ml-1 text-[8px]">
                    (4)
                  </span>
                )}
                {index === 2 && (
                  <span className="text-foreground-muted ml-1 text-[8px]">
                    (2)
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="gap-small md:gap-medium flex flex-row-reverse items-start sm:flex-row">
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
