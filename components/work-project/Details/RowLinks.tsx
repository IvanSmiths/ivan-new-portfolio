import SquareArrowOutUpRight from "../../global/Icons/SquareArrowOutUpRight";
import clsx from "clsx";

type RowLinksProps = {
  website: string;
  linkedin?: string;
  className?: string;
};

const RowLinks = ({ website, linkedin, className }: RowLinksProps) => {
  return (
    <div
      className={clsx(
        "border-background-muted pl-sm py-xs flex border-b-1 opacity-0",
        className,
      )}
    >
      <span className="text-foreground-muted w-24 flex-shrink-0">Links</span>
      <span className="flex">
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 underline"
        >
          <span>Website</span>
          <SquareArrowOutUpRight />
        </a>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 underline"
          >
            ,<span>LinkedIn</span>
            <SquareArrowOutUpRight />
          </a>
        )}
      </span>
    </div>
  );
};

export default RowLinks;
