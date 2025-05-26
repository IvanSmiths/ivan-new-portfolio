import { FC, RefObject } from "react";
import Link from "next/link";
import { WorkProjectBase } from "../../utils/data/types";

interface WorkTitleProps {
  work: WorkProjectBase;
  path: string;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLHeadingElement | null>;
}

const TemplateText: FC<WorkTitleProps> = ({
  work,
  path,
  titleRef,
  subtitleRef,
}) => {
  return (
    <>
      <Link href={(path + "/" + work.slug).toString()}>
        <h2
          ref={titleRef}
          className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 text-center text-6xl font-black uppercase lg:text-8xl"
        >
          {work?.name}
        </h2>
      </Link>

      <h3
        ref={subtitleRef}
        className="absolute top-28 left-1/2 hidden origin-center -translate-x-1/2 -translate-y-1/2 text-center md:block lg:top-[114px]"
      >
        {work?.role}
      </h3>
    </>
  );
};

export default TemplateText;
