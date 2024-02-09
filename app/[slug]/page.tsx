import { projectlist } from "../../utils/works";

export async function generateStaticParams() {
  return projectlist.map((p) => ({
    uniquepage: p.slug.toString(),
  }));
}

export default function UniquePage({
  params: { uniquepage },
}: {
  params: { uniquepage: string };
}) {
  const project = projectlist.find((p) => p.slug.toString() === uniquepage);
  console.log(project);
  return <main></main>;
}
