import Description from "../../components/Work/Description";
import { RichTextContent } from "@graphcms/rich-text-types";
import Images from "../../components/Work/Images";

export async function generateMetadata(slug: string): Promise<QueryResultMeta> {
  // @ts-ignore
  const product = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query Works($slug: String!) {
          works(where: {slug: $slug}) {
           title
            }
          }
        `,
      variables: {
        slug: slug,
      },
    }),
  }).then((res) => res.json());

  const title =
    product.data && product.data.works && product.data.works[0]
      ? product.data.works[0].title
      : "";
  console.log(title);

  return {
    title: title,
  };
}

type Test = {
  title: string;
};

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
  images: RichTextContent;
};

type QueryResult = {
  works: Work[];
};

type QueryResultMeta = {
  title: Test[];
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
            images {
              raw
            }
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
  await generateMetadata(params.slug);
  return (
    <>
      {works.map((work: Work) => (
        <div className="grid" key={work.id}>
          <Description work={work} />
          <Images work={work} />
        </div>
      ))}
    </>
  );
}
