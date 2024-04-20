import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Note: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div
      id="articleNote"
      {...props}
      className="p-5 rounded-xl bg-secondaryLight"
    >
      {children}
    </div>
  );
};

export default Note;
