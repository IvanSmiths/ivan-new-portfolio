import React from "react";
import { getProjectsPage } from "../../../utils/graphql";
import { ProjectPage } from "../../../utils/graphql/graphqlTypes";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Footer from "../../globalComponents/Footer/Footer";
import Hero from "./components/Hero";
import Images from "./components/Images";

export type Props = {
  params: { slug: string };
};

const Project = async ({ params }: Props) => {
  const projects: ProjectPage = await getProjectsPage(params.slug);

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Hero project={projects} />
      <Images project={projects} />
      <Footer />
    </>
  );
};

export default Project;
