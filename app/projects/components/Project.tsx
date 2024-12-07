import Link from "next/link";
import { FC, Key } from "react";
import { ProjectBase } from "../../../utils/graphql/graphqlTypes";

type ProjectProps = {
  project: ProjectBase;
  index: Key;
  isInHome?: boolean;
};

const Project: FC<ProjectProps> = ({ project, index, isInHome }) => {
  return (
    <Link
      href={`projects/${project.slug}`}
      key={index}
      data-testid={`homeWork${index}`}
      className={`flex items-center justify-center ${
        isInHome ? "w-full md:w-[calc(50%-10px)]" : "h-screen w-screen p-small"
      }`}
    >
      <div
        id="description"
        className={`relative ${isInHome ? "h-full w-full" : "h-5/6 md:w-7/12"}`}
      >
        <img
          className="absolute left-small top-small z-[3] h-fit w-20 rounded-md object-cover"
          src={project.homeLogo.url}
          alt={project.project}
          width={project.homeLogo.width}
          height={project.homeLogo.height}
        />
        <div className="absolute inset-0 z-[2] rounded-lg bg-black/30"></div>
        <div className="absolute bottom-small left-small pr-small text-light">
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
