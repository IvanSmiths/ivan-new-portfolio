import Link from "next/link";
import { usePathname } from "next/navigation";
import { internalRoutes, type LinkItem } from "../../../_config/config";
import works from "../../../pages/works";
import { dm_mono } from "../../../utils/style/fonts/fonts";

const InternalLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="gap-md flex items-start">
      {internalRoutes.map((link: LinkItem, index: number) => {
        const isActive =
          link.url === "/" ? pathname === "/" : pathname.startsWith(link.url);
        return (
          <li className="flex" key={link.url}>
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
          </li>
        );
      })}
    </ul>
  );
};

export default InternalLinks;
