import { FC } from "react";
import { Work } from "../../utils/works";

interface HeaderProps {
  work: Work;
}
const Images: FC<HeaderProps> = ({ work }) => {
  return <div className="grid-work-images w-full"></div>;
};

export default Images;
