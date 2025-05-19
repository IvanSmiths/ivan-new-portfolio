"use client";

import Link from "next/link";
import { dm_mono } from "../../../utils/fonts";
import works from "../../../utils/pages/works";
import projects from "../../../utils/pages/projects";
import { internalLinks, LinkItem } from "../../../_config/config";
import { usePathname } from "next/navigation";

const InternalLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="gap-md flex items-start">
      {internalLinks.map((link: LinkItem, index: number) => {
        const isActive =
          link.url === "/" ? pathname === "/" : pathname.startsWith(link.url);
        return (
          <li className="flex" key={index}>
            <Link
              href={link.url}
              className={`flex text-xs uppercase ${dm_mono.className} ${
                isActive ? "underline underline-offset-2" : ""
              } ${index !== 1 && index !== 2 ? "mr-1" : ""}`}
            >
              {link.label}
            </Link>
            {index === 1 && (
              <span className="text-foreground-muted ml-1 text-[8px]">
                ({works.length})
              </span>
            )}
            {index === 2 && (
              <span className="text-foreground-muted ml-1 text-[8px]">
                ({projects.length})
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default InternalLinks;
