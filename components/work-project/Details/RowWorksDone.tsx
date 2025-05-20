import { Link } from "../../../utils/pages/types";
import SquareArrowOutUpRight from "../../global/Icons/SquareArrowOutUpRight";

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
              className="flex items-center gap-1 underline"
            >
              <span>{work.label}</span>
              <SquareArrowOutUpRight />
              {index < works.length - 1 && <>,</>}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default RowWorksDone;
