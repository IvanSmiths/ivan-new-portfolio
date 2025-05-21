import Link from "next/link";
import { FC, Key } from "react";
import { WorkProjectBase } from "../../utils/pages/types";

type WorkProps = {
  work: WorkProjectBase;
  index: Key;
  path?: string;
};

const TemplateMapped: FC<WorkProps> = ({ work, index, path }) => {
  return (
    <div
      key={index}
      className="relative flex h-screen w-screen items-center justify-center"
    >
      <span className="top-2xl left-xl absolute">{index}</span>
      <div className="w-5/12">
        <Link href={`${path}/${work.slug}`}>
          <img
            className="h-full w-full object-cover"
            src={work.homeImage.url}
            alt={work.name}
            width={work.homeImage.width}
            height={work.homeImage.height}
          />
        </Link>
        <div className="flex justify-between">
          <h2>{work.role}</h2>
          <h3>{work.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default TemplateMapped;
