import { FC } from "react";
import Footer from "../globalComponents/Footer/Footer";
import Navbar, { Position } from "../globalComponents/Navbar/Navbar";
import { Projects } from "../../utils/graphql/graphqlTypes";
import { getProjects } from "../../utils/graphql/projects";

const ProjectPage: FC = async () => {
  const projects: Projects[] = await getProjects();

  console.log(projects);

  return (
    <>
      <Navbar position={Position.Fixed} />
      <Footer />
    </>
  );
};

export default ProjectPage;
