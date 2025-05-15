import { FC } from "react";
import { ProjectPage } from "../../utils/pages/types";

interface HeaderProps {
  project: ProjectPage;
}

const Images: FC<HeaderProps> = ({ project }) => {
  console.log(project.images);
  if (project.images) {
    return (
      <div className="mb-medium mt-section grid md:mb-0">
        <div className="col-span-full w-full md:col-start-2 md:col-end-12">
          <ul className="flex flex-col gap-small">
            <li></li>
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Images;
