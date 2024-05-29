import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Note: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div
      id="articleNote"
      {...props}
      className="rounded-xl bg-secondaryLight p-5"
    >
      {children}
    </div>
  );
};

export default Note;
