import { FC, Key } from "react";
import { Projects } from "../../../utils/graphql";
import Project from "./Project";

type ProjectsProps = {
  projects: Projects[];
};

const ProjectsSection: FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="overflow-hidden md:py-medium">
      <div>
        <div className="flex h-screen w-fit gap-small">
          {projects.map((project: Projects, index: Key) => (
            <Project key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
