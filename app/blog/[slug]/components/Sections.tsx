import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Sections: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      id="articleLinks"
      className="hidden md:block absolute h-full top-medium mt-regular left-0 col-start-1 lg:col-end-3 col-end-4"
    >
      <div className="sticky top-1/4 flex flex-col">
        <span>Table of contents</span>
        {children}
      </div>
    </div>
  );
};

export default Sections;
