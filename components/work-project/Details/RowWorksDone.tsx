import { Link } from "../../../utils/pages/types";

type RowWorksDoneRow = {
  works: Link[];
};

const RowWorksDone = ({ works }: RowWorksDoneRow) => {
  return (
    <div className="border-background-muted py-xs flex items-start border-b-1">
      <div className="text-foreground-muted w-24 flex-shrink-0">Works Done</div>
      <div className="flex flex-wrap gap-x-1 gap-y-0.5 break-words">
        {works.map((work, index) => (
          <span key={index}>
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {work.label}
            </a>
            {index < works.length - 1 && <span>, </span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RowWorksDone;
