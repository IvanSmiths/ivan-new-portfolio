import {
  ApiResponseProjectPage,
  ApiResponseProjects,
  ApiResponseWorkPage,
  ApiResponseWorks,
  ProjectPage,
  Projects,
  WorkPage,
  Works,
} from "./graphqlTypes";

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
  const responseData: ApiResponseWorks = await response.json();
  return responseData.data.works;
}

export async function getProjects(): Promise<Projects[]> {
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
        query Projects() {
          projects(orderBy: createdAt_ASC) {
            id
            slug
            project
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
  const responseData: ApiResponseProjects = await response.json();
  return responseData.data.projects;
}

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
  const responseDataPage: ApiResponseWorkPage = await response.json();
  return responseDataPage.data.works[0];
}

export async function getProjectsPage(slug: string): Promise<ProjectPage> {
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
        query Projects($slug: String!) {
          projects(where: {slug: $slug}) {
            id
            slug
            project
            description
            websiteLink
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
  const responseDataPage: ApiResponseProjectPage = await response.json();
  return responseDataPage.data.projects[0];
}
