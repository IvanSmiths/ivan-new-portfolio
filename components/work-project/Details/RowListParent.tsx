import { dm_sans } from "../../../utils/fonts/fonts";
import RowList from "./RowList";

type RowListParentProps = {
  description: string[];
};

const RowListParent = ({ description }: RowListParentProps) => {
  return (
    <>
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
    </>
  );
};

export default RowListParent;
