import { FC, ReactNode } from "react";

type NoteProps = {
  children: ReactNode;
};
const Note: FC<NoteProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="p-5 rounded-xl border-primaryLight bg-secondaryLight text-primary"
    >
      {children}
    </div>
  );
};

export default Note;
