import { FC } from "react";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { getProjects } from "../../utils/graphql/projects";

const ProjectPage: FC = async () => {
  const projects: any = await getProjects();

  console.log(projects);

  return (
    <>
      <Navbar position={Position.Fixed} />
      hi there
      <Footer />
    </>
  );
};

export default ProjectPage;
