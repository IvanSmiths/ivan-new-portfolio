"use client";

import { FC, Key } from "react";
import Project from "./Project";
import { Projects } from "../../../utils/graphql/graphqlTypes";

type ProjectsSectionProps = {
  projects: Projects[];
};

const ProjectsSection: FC<ProjectsSectionProps> = ({ projects }) => {
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
