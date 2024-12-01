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
import {
  getProjectsPageQuery,
  GetProjectsQuery,
  getWorksPageQuery,
  GetWorksQuery,
} from "./graphqlQueries";

function getEndpoint(): string {
  const endpoint = process.env.HYGRAPH_ENDPOINT;
  if (!endpoint)
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  return endpoint;
}

export async function getWorks(): Promise<Works[]> {
  const response: Response = await fetch(getEndpoint(), {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: GetWorksQuery,
    }),
  });
  const responseData: ApiResponseWorks = await response.json();
  return responseData.data.works;
}

export async function getProjects(): Promise<Projects[]> {
  const response: Response = await fetch(getEndpoint(), {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: GetProjectsQuery,
    }),
  });
  const responseData: ApiResponseProjects = await response.json();
  return responseData.data.projects;
}

export async function getWorksPage(slug: string): Promise<WorkPage> {
  const response: Response = await fetch(getEndpoint(), {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getWorksPageQuery,
      variables: {
        slug: slug,
      },
    }),
  });
  const responseDataPage: ApiResponseWorkPage = await response.json();
  return responseDataPage.data.works[0];
}

export async function getProjectsPage(slug: string): Promise<ProjectPage> {
  const response: Response = await fetch(getEndpoint(), {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getProjectsPageQuery,
      variables: {
        slug: slug,
      },
    }),
  });
  const responseDataPage: ApiResponseProjectPage = await response.json();
  return responseDataPage.data.projects[0];
}
