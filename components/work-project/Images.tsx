import { FC } from "react";
import { WorkProjectPage } from "../../utils/pages/types";

interface HeaderProps {
  work: WorkProjectPage;
}

const Images: FC<HeaderProps> = ({ work }) => {
  return (
    <div className="w-full">
      <ul className="gap-sm flex w-full flex-col">
        {work.images.map((image, index) => (
          <li key={index} className="w-full">
            <img className="h-full" src={image} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Images;
