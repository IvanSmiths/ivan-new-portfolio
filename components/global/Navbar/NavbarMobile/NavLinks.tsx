import Link from "next/link";
import { MutableRefObject } from "react";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/crafts", label: "CRAFTS" },
  { href: "/blog", label: "BLOG" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/works", label: "WORKS" },
  { href: "/", label: "HOME" },
];

type NavLinksProps = {
  toggleMenu: () => void;
  linksRef: MutableRefObject<(HTMLLIElement | null)[]>;
};

export default function NavLinks({ toggleMenu, linksRef }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <ul className="gap-s flex w-full flex-col overflow-auto">
      {navLinks.map((link: NavLink, index: number) => (
        <li
          key={link.href}
          ref={(el: HTMLLIElement | null): void => {
            linksRef.current[index] = el;
          }}
          style={{ opacity: 0 }}
          className="pr-sm flex w-full flex-col items-end"
        >
          <span className="bg-background-muted w-full p-[0.5px]"></span>
          <Link
            href={link.href}
            onClick={toggleMenu}
            className={`pr-small py-md text-6xl font-bold ${
              isActive(link.href) ? "text-foreground" : "text-foreground-muted"
            }`}
          >
            {link.label}
          </Link>
          {index === 4 && (
            <span className="bg-background-muted w-full p-[0.5px]"></span>
          )}
        </li>
      ))}
    </ul>
  );
}
