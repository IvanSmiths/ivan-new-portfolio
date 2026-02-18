import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import { internalRoutes, type LinkItem } from "../../../../_config/config";

type NavLinksProps = {
  toggleMenu: () => void;
  linksRef: RefObject<(HTMLLIElement | null)[]>;
};

export default function NavLinks({ toggleMenu, linksRef }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <ul className="gap-s flex w-full flex-col overflow-auto">
      {internalRoutes.map((link: LinkItem, index: number) => (
        <li
          key={link.url}
          ref={(el: HTMLLIElement | null): void => {
            linksRef.current[index] = el;
          }}
          style={{ opacity: 0 }}
          className="pr-sm flex w-full flex-col items-end"
        >
          <span className="bg-background-muted w-full p-[0.5px]"></span>
          <Link
            href={link.url}
            onClick={toggleMenu}
            className={`pr-small py-md text-6xl font-bold ${
              isActive(link.url) ? "text-foreground" : "text-foreground-muted"
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
