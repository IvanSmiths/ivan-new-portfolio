import { Link } from "../../../utils/data/types";
import SquareArrowOutUpRight from "../../global/Icons/SquareArrowOutUpRight";

type RowWorksDoneRow = {
  worksDone: Link[];
};

const RowWorksDone = ({ worksDone }: RowWorksDoneRow) => {
  const shouldRenderAsPlainText = (label: string) => {
    return (
      label === "RE/MAX" ||
      label === "Lemon Soda" ||
      label === "TD Cowen Dashboard"
    );
  };

  return (
    <div className="border-background-muted pl-sm py-xs flex items-start border-b-1">
      <div className="text-foreground-muted w-24 flex-shrink-0">Works Done</div>
      <div className="gap-xs flex flex-wrap gap-y-0.5 break-words">
        {worksDone.map((work, index) => (
          <span key={index}>
            {shouldRenderAsPlainText(work.label) ? (
              <span className="flex items-center gap-1">
                <span>{work.label}</span>
                {index < worksDone.length - 1 && <>,</>}
              </span>
            ) : (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 underline"
              >
                <span>{work.label}</span>
                <SquareArrowOutUpRight />
                {index < worksDone.length - 1 && <>,</>}
              </a>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RowWorksDone;
