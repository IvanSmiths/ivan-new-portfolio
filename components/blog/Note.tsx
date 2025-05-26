import { FC } from "react";
import { ChildrenAsProps } from "../../mdx-components";

const Note: FC<ChildrenAsProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="bg-background-muted p-md border-foreground-muted border"
    >
      {children}
    </div>
  );
};

export default Note;
