import { RichTextContent } from "@graphcms/rich-text-types";

export type WorkType = {
  slugHome: string;
  title: string;
  company: string;
  role: string;
  homeDescription: string;
  homeLogo: string;
  homeImage: string;
};

type QueryResult = {
  works: WorkType[];
};

type Response = {
  data: QueryResult;
};

export async function getWorks(): Promise<WorkType[]> {
  if (!process.env.HYGRAPH_ENDPOINT) {
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  }
  const response: globalThis.Response = await fetch(
    process.env.HYGRAPH_ENDPOINT,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
        query Works() {
          works(orderBy: createdAt_ASC) {
            slugHome
            createdAt
            company
            role
            homeDescription
            homeLogo {
              url
            }
            homeImage {
              url
            }
            }
          }
        `,
      }),
    },
  );
  const { data }: Response = await response.json();
  return data.works;
}

export type WorkPage = {
  id: string;
  slug: string;
  title: string;
  company: string;
  description: RichTextContent;
  date: string;
  role: string;
  linkedinLink: string;
  websiteLink: string;
  stack: string;
  images: RichTextContent;
};

type QueryResultPage = {
  works: WorkPage[];
};

type ResponsePage = {
  data: QueryResultPage;
};

export async function getWorksPage(slug: string): Promise<WorkPage> {
  if (!process.env.HYGRAPH_ENDPOINT) {
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  }
  const response = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    cache: "no-cache",
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
  const { data }: ResponsePage = await response.json();

  return data.works[0];
}
