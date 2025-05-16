import Link from "next/link";
import { FC, Key } from "react";
import { WorkProjectBase } from "../../utils/pages/types";

type WorkProps = {
  work: WorkProjectBase;
  index: Key;
  isInHome?: boolean;
  path: string;
};

const TemplateMapped: FC<WorkProps> = ({ work, index, isInHome, path }) => {
  return (
    <Link
      href={`${path}/${work.slug}`}
      key={index}
      data-testid={`homeWork${index}`}
      className={`flex items-center justify-center ${
        isInHome
          ? "z-10 w-full md:w-[calc(50%-10px)]"
          : "p-small h-screen w-screen"
      }`}
    >
      <div
        id="description"
        className={`relative z-20 ${
          isInHome ? "h-full w-full" : "h-5/6 md:w-7/12"
        }`}
      >
        <div className="absolute inset-0 z-10 rounded-lg bg-black/30"></div>
        <div className="bottom-small left-small pr-small text-light absolute z-20">
          <h2 className="pb-smallest text-3xl font-bold">{work.role}</h2>
          <h3 className="text-xl">{work.name}</h3>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-cover"
          src={work.homeImage.url}
          alt={work.name}
          width={work.homeImage.width}
          height={work.homeImage.height}
        />
      </div>
    </Link>
  );
};

export default TemplateMapped;
