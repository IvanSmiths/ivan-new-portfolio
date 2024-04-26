import { FC, Key } from "react";
import Work from "../../components/Works/Work";
import { Works } from "../../../utils/graphql";

type WorksProps = {
  works: Works[];
};

const InfiniteScroll: FC<WorksProps> = ({ works }) => {
  return (
    <div className="grid">
      <div className="flex md:col-start-3 md:col-end-11 col-start-1 col-end-7">
        <ul className="w-full flex flex-col items-center justify-center">
          {works.map((work: Works, index: Key) => (
            <Work key={index} work={work} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfiniteScroll;
