import { ElementNode, RichTextContent } from "@graphcms/rich-text-types";

export type Works = {
  id: string;
  slug: string;
  company: string;
  role: string;
  homeDescription: string;
  homeLogo: {
    url: string;
    height: number;
    width: number;
  };
  homeImage: {
    url: string;
    height: number;
    width: number;
  };
};

type ApiResponse = {
  data: {
    works: Works[];
  };
};

export async function getWorks(): Promise<Works[]> {
  if (!process.env.HYGRAPH_ENDPOINT) {
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  }
  const response: Response = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query Works() {
          works(orderBy: createdAt_ASC) {
            id
            slug
            company
            role
            homeLogo {
              url
              height
              width
            }
            homeDescription
            homeImage {
              url
              height
              width
            }
           }
          }
        `,
    }),
  });
  const responseData: ApiResponse = await response.json();
  return responseData.data.works;
}

export type WorkPage = {
  id: string;
  slug: string;
  title: string;
  company: string;
  description: { raw: RichTextContent };
  date: string;
  role: string;
  homeDescription: string;
  metaDescription: string;
  worksDone: {
    works: { label: string; link: string }[];
  };
  linkedinLink: string;
  homeImage: {
    url: string;
    height: number;
    width: number;
    fileName: string;
  };
  websiteLink: string;
  stack: string;
  images: { raw: { children: ElementNode[] } };
};

type ApiResponsePage = {
  data: {
    works: WorkPage[];
  };
};

export async function getWorksPage(slug: string): Promise<WorkPage> {
  if (!process.env.HYGRAPH_ENDPOINT) {
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  }
  const response: Response = await fetch(process.env.HYGRAPH_ENDPOINT, {
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
            worksDone
            stack
            title
            metaDescription
            homeImage {
            url
            height
            width
            fileName
          }
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
  const responseDataPage: ApiResponsePage = await response.json();
  return responseDataPage.data.works[0];
}
