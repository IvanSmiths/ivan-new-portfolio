import { RichText } from "@graphcms/rich-text-react-renderer";
import { FC } from "react";
import { ProjectPage } from "../../../../utils/graphql";

interface HeaderProps {
  project: ProjectPage;
}

const Images: FC<HeaderProps> = ({ project }) => {
  if (project.images) {
    return (
      <div className="mb-medium mt-section grid md:mb-0">
        <div className="col-span-full w-full md:col-start-2 md:col-end-12">
          <ul className="flex flex-col gap-small">
            <RichText
              content={project.images.raw}
              renderers={{
                img: ({ src, height, width }) => (
                  <li>
                    <img
                      src={src}
                      className="w-full rounded-md"
                      alt="project"
                      loading="lazy"
                      height={height}
                      width={width}
                    ></img>
                  </li>
                ),
              }}
            />
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Images;
