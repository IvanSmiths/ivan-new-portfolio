import type { FC, RefObject } from "react";
import type { WorkProjectBase } from "../../utils/data/types";
import TemplateItem from "./TemplateItem";

type TemplateItemWrapperProps = {
  works: WorkProjectBase[];
  path: string;
  containerRef: RefObject<HTMLDivElement | null>;
};

const TemplateItemWrapper: FC<TemplateItemWrapperProps> = ({
                                                             works,
                                                             path,
                                                             containerRef
                                                           }) => {
  return (
    <div
      className="animate-fadeInUp opacity-0"
      style={{ animationDelay: "0ms" }}
    >
      <div ref={containerRef} className="flex h-screen w-fit">
        {works.map((work, index) => (
          <TemplateItem key={index} work={work} path={path} />
        ))}
      </div>
    </div>
  );
};

export default TemplateItemWrapper;
