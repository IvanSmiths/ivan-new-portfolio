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
    <div
      className="animate-fadeInUp px-md absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 sm:px-36 md:px-56 lg:px-92"
      style={{ animationDelay: "200ms" }}
    >
      <Link
        className="text-5xl font-black uppercase sm:text-6xl lg:text-8xl"
        href={(path + "/" + work.slug).toString()}
      >
        <h2 ref={titleRef}>{work?.name}</h2>
      </Link>

      <h3
        ref={subtitleRef}
        className="hidden origin-center text-center font-medium md:block lg:top-[114px]"
      >
        {work?.role}
      </h3>
    </div>
  );
};

export default TemplateText;
