import { FC, ReactNode } from "react";

type NoteProps = {
  children: ReactNode;
};
const Note: FC<NoteProps> = ({ children }) => {
  return <div className="bg-red-500">{children}</div>;
};

export default Note;
