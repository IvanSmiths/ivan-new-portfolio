import { FC } from "react";
import { WorkProjectPage } from "../../utils/pages/types";

interface HeaderProps {
  work: WorkProjectPage;
}

const Images: FC<HeaderProps> = ({ work }) => {
  if (work.images) {
    return (
      <div className="w-7/12">
        <div className="col-span-full w-full md:col-start-2 md:col-end-12">
          <ul className="gap-small flex flex-col"></ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Images;
