import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Note: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div
      id="articleNote"
      {...props}
      className="bg-brand rounded-xl p-5 font-bold"
    >
      {children}
    </div>
  );
};

export default Note;
