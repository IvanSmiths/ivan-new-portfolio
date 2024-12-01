import { FC } from "react";
import { ChildrenAsProps } from "./MDXComponents";

const Note: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div
      id="articleNote"
      {...props}
      className="rounded-xl bg-brand p-5 font-bold dark:bg-brand"
    >
      {children}
    </div>
  );
};

export default Note;
