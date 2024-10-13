import Link from "next/link";
import { MutableRefObject } from "react";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/crafts", label: "CRAFTS" },
  { href: "/blog", label: "BLOG" },
  { href: "/works", label: "WORKS" },
  { href: "/", label: "HOME" },
];

interface NavLinksProps {
  pathname: string;
  toggleMenu: () => void;
  linksRef: MutableRefObject<(HTMLLIElement | null)[]>;
}

export default function NavLinks({
  pathname,
  toggleMenu,
  linksRef,
}: NavLinksProps) {
  return (
    <ul className="flex w-full flex-col gap-small text-2xl">
      {navLinks.map((link: NavLink, index: number) => (
        <li
          key={link.href}
          ref={(el: HTMLLIElement | null): void => {
            linksRef.current[index] = el;
          }}
          style={{ opacity: 0 }}
          className="flex w-full flex-col items-end gap-small"
        >
          <span className="bg-darkSecondary dark:bg-lightSecondary w-full p-[1px]"></span>
          <Link
            href={link.href}
            onClick={toggleMenu}
            className={`pr-small text-7xl ${
              pathname === link.href
                ? "text-darkSecondary dark:text-lightSecondary"
                : "text-dark dark:text-light"
            }`}
          >
            {link.label}
          </Link>
          {index === 3 && (
            <span className="bg-darkSecondary dark:bg-lightSecondary w-full p-[1px]"></span>
          )}
        </li>
      ))}
    </ul>
  );
}
