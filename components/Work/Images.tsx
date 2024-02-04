import { FC } from "react";
import { Work } from "../../utils/works";

interface HeaderProps {
  work: Work;
}
const Images: FC<HeaderProps> = ({ work }) => {
  if (work.images) {
    return (
      <div className="grid-work-images w-full pt-small">
        <ul className="flex flex-col gap-small">
          {work.images.map((image) => (
            <li key={image}>
              <img src={image} width="1920" height="1109" alt="" />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Images;
