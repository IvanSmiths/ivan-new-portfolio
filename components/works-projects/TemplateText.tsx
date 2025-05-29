import { FC, RefObject } from "react";
import Link from "next/link";
import { WorkProjectBase } from "../../utils/data/types";

interface WorkTitleProps {
  work: WorkProjectBase;
  path: string;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLHeadingElement | null>;
  textWrapperRef: RefObject<HTMLDivElement | null>;
}

const TemplateText: FC<WorkTitleProps> = ({
  work,
  path,
  titleRef,
  subtitleRef,
  textWrapperRef,
}) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 text-center"
      ref={textWrapperRef}
    >
      <Link
        className="text-6xl font-black uppercase lg:text-8xl"
        href={(path + "/" + work.slug).toString()}
      >
        <h2 ref={titleRef}>{work?.name}</h2>
      </Link>

      <h3
        ref={subtitleRef}
        className="hidden origin-center text-center md:block lg:top-[114px]"
      >
        {work?.role}
      </h3>
    </div>
  );
};

export default TemplateText;
