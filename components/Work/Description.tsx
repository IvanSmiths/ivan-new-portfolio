import { FC } from "react";
import { Work } from "../../utils/works";
import Link from "next/link";

interface HeaderProps {
  work: Work;
}

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <>
      <div className="grid-work-description pt-5 bg-gray-700 flex flex-col gap-medium w-full">
        <span className="pb-medium">
          <Link href="/">back home</Link>
        </span>
        <h1 className="heading-regular font-bold">{work.company}</h1>
      </div>
      <div className="grid-work-images bg-red-300 h-full w-full"></div>
    </>
  );
};

export default Description;
