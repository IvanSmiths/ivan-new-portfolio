import { FC, Key } from "react";
import Link from "next/link";
import { Works } from "../../../utils/graphql";

type WorkProps = {
  work: Works;
  index: Key;
};

const Work: FC<WorkProps> = ({ work, index }) => {
  return (
    <div
      key={index}
      data-testid={`homeWork${index}`}
      className="flex h-[100vh] w-[100vw] items-center"
    >
      <div className="grid h-4/5 w-full items-center md:h-3/5">
        <div className="right-auto col-start-1 col-end-7 flex h-full w-full flex-col justify-end text-left md:col-start-3 md:col-end-6 md:items-end md:justify-between md:text-right lg:col-start-4">
          <Link href={`works/${work.slug}`}>
            <h3 className="lato">{work.company}</h3>
            <h4 className="mt-1 text-4xl font-bold">{work.role}</h4>
          </Link>
          <h5 className="hidden sm:block">{work.homeDescription}</h5>
        </div>
        <Link
          href={`works/${work.slug}`}
          className="col-start-1 col-end-7 flex h-full w-full md:col-start-6 md:col-end-11 lg:col-end-10"
        >
          <img
            src={work.homeImage.url}
            height={work.homeImage.height}
            width={work.homeImage.width}
            loading="lazy"
            className="h-full w-full rounded-md object-cover"
            alt={`${work.company} work`}
          />
        </Link>
      </div>
    </div>
  );
};

export default Work;
