type RowLinksProps = {
  website: string;
  linkedin?: string;
};

const RowLinks = ({ website, linkedin }: RowLinksProps) => {
  return (
    <div className="border-background-muted py-xs flex border-b-1">
      <span className="text-foreground-muted w-24 flex-shrink-0">Links</span>
      <span>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Website -{">"}
        </a>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            , {""} LinkedIn -{">"}
          </a>
        )}
      </span>
    </div>
  );
};

export default RowLinks;
