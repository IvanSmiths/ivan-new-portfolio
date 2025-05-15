import { FC, Key } from "react";
import Project from "./Project";
import { ProjectBase } from "../../../utils/pages/types";

type ProjectsProps = {
  projects: ProjectBase[];
};

const ProjectsSection: FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="overflow-hidden md:py-medium">
      <div>
        <div className="flex h-screen w-fit gap-small">
          {projects.map((project: ProjectBase, index: Key) => (
            <Project key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
