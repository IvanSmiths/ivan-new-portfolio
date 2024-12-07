import { getProjects } from "../../utils/graphql";

export default async function Page() {
  const projects = await getProjects();
  console.log(projects);
  return <div></div>;
}
