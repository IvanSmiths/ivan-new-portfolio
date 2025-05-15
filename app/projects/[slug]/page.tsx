import { ProjectPage } from "../../../utils/pages/types";
import Navbar, { Position } from "../../components/global/Navbar/Navbar";
import Hero from "../../components/project/Hero";
import Images from "../../components/project/Images";
import { projectSchema } from "../../../utils/metadata/Schemas";
import { generateMetadata } from "../../../utils/metadata/projectMetadata";
import Footer from "../../components/global/Footer/Footer";
import { FC } from "react";
import projectsData from "../../../utils/pages/projects/projects";
import { notFound } from "next/navigation";

export type Props = {
  params: { slug: string };
};

export { generateMetadata };

const Project: FC<Props> = ({ params }) => {
  const project = (projectsData as ProjectPage[]).find(
    (proj) => proj.slug === params.slug
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Hero project={project} />
      <Images project={project} />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema(project)),
        }}
      />
    </>
  );
};

export default Project;
