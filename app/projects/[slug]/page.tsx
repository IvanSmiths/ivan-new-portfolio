import React from "react";
import { getProjectsPage } from "../../../utils/graphql";
import { ProjectPage } from "../../../utils/graphql/graphqlTypes";

export type Props = {
  params: { slug: string };
};

const Project = async ({ params }: Props) => {
  const projects: ProjectPage = await getProjectsPage(params.slug);
  console.log(projects);

  return <div></div>;
};

export default Project;
