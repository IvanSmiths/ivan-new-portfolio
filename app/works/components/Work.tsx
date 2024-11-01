import Link from "next/link";
import { FC, Key } from "react";
import { Works } from "../../../utils/graphql";

type WorkProps = {
  work: Works;
  index: Key;
};

const Work: FC<WorkProps> = ({ work, index }) => {
  return (
    <Link
      href={`works/${work.slug}`}
      key={index}
      data-testid={`homeWork${index}`}
      className="flex h-screen w-screen items-center justify-center p-small"
    >
      <div
        id="description"
        className="relative z-20 h-full w-full md:h-5/6 md:w-7/12"
      >
        <div className="absolute inset-0 z-10 rounded-xl bg-black/50"></div>
        <div className="absolute bottom-small left-small z-20 pr-small text-light">
          <h4 className="pb-smallest text-xl font-bold">{work.role}</h4>
          <p className="text-lg">{work.homeDescription}</p>
        </div>
        <img
          className="relative h-full w-full rounded-xl object-cover"
          src={work.homeImage.url}
          alt={work.company}
          width={work.homeImage.width}
          height={work.homeImage.height}
        />
      </div>
    </Link>
  );
};

export default Work;
