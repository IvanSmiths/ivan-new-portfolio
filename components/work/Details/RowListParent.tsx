import { dm_sans } from "../../../utils/style/fonts/fonts";
import RowList from "./RowList";

type RowListParentProps = {
  description: string[];
  className?: string;
};

const RowListParent = ({ description, className }: RowListParentProps) => {
  return (
    <div>
			<span
        className={`${dm_sans.className} text-foreground-muted pl-sm mt-md block`}
      >
				Highlight
			</span>
      <ul className="pl-sm">
        {description.map((desc, i) => (
          <RowList key={i} desc={desc} />
        ))}
      </ul>
    </div>
  );
};

export default RowListParent;
