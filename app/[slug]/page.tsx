import Description from "../../components/Work/Description";
import { RichTextContent } from "@graphcms/rich-text-types";

export type Work = {
  id: string;
  slug: string;
  company: string;
  description: RichTextContent;
  date: string;
  role: string;
  linkedinLink: string;
  websiteLink: string;
  stack: string;
};

type QueryResult = {
  works: Work[];
};

type Response = {
  data: QueryResult;
};

async function getWorks(slug: string): Promise<Work[]> {
  if (!process.env.HYGRAPH_ENDPOINT) {
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  }
  const response = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query Works($slug: String!) {
          works(where: {slug: $slug}) {
            id
            slug
            company
            date
            description {
      raw
            }
            role
            linkedinLink
            websiteLink
            stack
            }
          }
        `,
      variables: {
        slug: slug,
      },
    }),
  });
  const { data }: Response = await response.json();

  return data.works;
}

export default async function Work({ params }) {
  const works: Work[] = await getWorks(params.slug);
  return (
    <>
      {works.map((work: Work) => (
        <div key={work.id}>
          <Description work={work} />
        </div>
      ))}
    </>
  );
}
