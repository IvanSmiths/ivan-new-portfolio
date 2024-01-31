import { FC } from "react";
import { Work } from "../../utils/works";

interface HeaderProps {
  work: Work;
}

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <>
      <div className="grid-work-description bg-gray-700 h-full w-full">
        <h1 className="heading-regular font-bold">{work.company}</h1>
      </div>
      <div className="grid-work-images bg-red-300 h-full w-full"></div>
    </>
  );
};

export default Description;
