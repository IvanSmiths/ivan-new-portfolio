import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Note: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div {...props} className="p-5 rounded-xl bg-secondaryLight text-primary">
      {children}
    </div>
  );
};

export default Note;
