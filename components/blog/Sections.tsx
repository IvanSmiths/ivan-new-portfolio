import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Sections: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      id="articleLinks"
      className="absolute left-0 top-medium col-start-1 col-end-4 mt-regular hidden h-full md:block lg:col-end-3"
    >
      <div className="sticky top-1/4 flex flex-col">
        <span>Table of contents</span>
        {children}
      </div>
    </div>
  );
};

export default Sections;
