import Link from "next/link";
import { forwardRef } from "react";
import { bebas_neue } from "../../../utils/fonts";
import { Works } from "../../../utils/graphql";

type WorkPanelProps = {
  work: Works;
};

const SingleWork = forwardRef<HTMLAnchorElement, WorkPanelProps>(
  ({ work }, ref) => {
    return (
      <Link
        ref={ref}
        className="relative grid h-screen w-full items-center justify-center bg-light dark:bg-dark"
        href={`works/${work.slug}`}
      >
        <h3
          className={`${bebas_neue.className} absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-9xl font-bold md:text-[19rem] md:leading-[15rem]`}
        >
          {work.company}
        </h3>
        <div
          id="description"
          className="relative z-20 col-span-full opacity-0 blur-2xl md:col-start-5 md:col-end-9"
        >
          <img
            className="absolute left-small top-small z-20 h-fit w-20 object-cover"
            src={work.homeLogo.url}
            alt={work.company}
            width={work.homeLogo.width}
            height={work.homeLogo.height}
          />
          <div className="absolute inset-0 z-10 rounded-xl bg-black/50"></div>
          <div className="absolute bottom-small left-small z-20 pr-small text-light">
            <h4 className="pb-smallest text-xl font-bold">{work.role}</h4>
            <p className="text-lg">{work.homeDescription}</p>
          </div>
          <img
            className="relative h-[40rem] rounded-xl object-cover"
            src={work.homeImage.url}
            alt={work.company}
            width={work.homeImage.width}
            height={work.homeImage.height}
          />
        </div>
      </Link>
    );
  },
);

SingleWork.displayName = "WorkPanel";

export default SingleWork;
