"use client";

import { FC, RefObject } from "react";
import TemplateItem from "./TemplateItem";
import { WorkProjectBase } from "../../utils/data/types";

type TemplateItemWrapperProps = {
  works: WorkProjectBase[];
  path: string;
  containerRef: RefObject<HTMLDivElement | null>;
  itemsWrapperRef: RefObject<HTMLDivElement | null>;
};

const TemplateItemWrapper: FC<TemplateItemWrapperProps> = ({
  works,
  path,
  containerRef,
  itemsWrapperRef,
}) => {
  return (
    <div ref={itemsWrapperRef}>
      <div ref={containerRef} className="flex h-screen w-fit">
        {works.map((work, index) => (
          <TemplateItem key={index} work={work} path={path} />
        ))}
      </div>
    </div>
  );
};

export default TemplateItemWrapper;
