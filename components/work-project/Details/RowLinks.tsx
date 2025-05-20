import SquareArrowOutUpRight from "../../global/Icons/SquareArrowOutUpRight";

type RowLinksProps = {
  website: string;
  linkedin?: string;
};

const RowLinks = ({ website, linkedin }: RowLinksProps) => {
  return (
    <div className="border-background-muted py-xs flex border-b-1">
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
