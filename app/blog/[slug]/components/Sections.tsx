import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Sections: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div {...props} className="absolute h-full top-medium mt-regular left-0">
      <div className="sticky top-1/4 flex flex-col">{children}</div>
    </div>
  );
};

export default Sections;
