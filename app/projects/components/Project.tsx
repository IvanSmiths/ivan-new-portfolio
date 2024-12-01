import Link from "next/link";
import { FC, Key } from "react";
import { Projects } from "../../../utils/graphql/graphqlTypes";

type ProjectProps = {
  project: Projects;
  index: Key;
};

const Project: FC<ProjectProps> = ({ project, index }) => {
  return (
    <Link
      href={`projects/${project.slug}`}
      key={index}
      data-testid={`homeWork${index}`}
      className="flex h-screen w-screen items-center justify-center p-small"
    >
      <div id="description" className="relative z-20 h-5/6 md:w-7/12">
        <img
          className="absolute left-small top-small z-20 h-fit w-20 rounded-md object-cover"
          src={project.homeLogo.url}
          alt={project.project}
          width={project.homeLogo.width}
          height={project.homeLogo.height}
        />
        <div className="absolute inset-0 z-10 rounded-lg bg-black/30"></div>
        <div className="absolute bottom-small left-small z-20 pr-small text-light">
          <h3 className="text-xl">{project.project}</h3>
        </div>
        <img
          className="relative h-full w-full rounded-lg object-cover"
          src={project.homeImage.url}
          alt={project.project}
          width={project.homeImage.width}
          height={project.homeImage.height}
        />
      </div>
    </Link>
  );
};

export default Project;
