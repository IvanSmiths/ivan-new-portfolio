import {
  GraphQLResponse,
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

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(getEndpoint(), {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((err) => err.message).join(", "));
  }

  return result.data;
}

export async function getWorks(): Promise<Works[]> {
  const data = await fetchGraphQL<{ works: Works[] }>(GetWorksQuery);
  return data.works;
}

export async function getProjects(): Promise<Projects[]> {
  const data = await fetchGraphQL<{ projects: Projects[] }>(GetProjectsQuery);
  return data.projects;
}

export async function getWorksPage(slug: string): Promise<WorkPage> {
  const data = await fetchGraphQL<{ works: WorkPage[] }>(getWorksPageQuery, {
    slug,
  });
  return data.works[0];
}

export async function getProjectsPage(slug: string): Promise<ProjectPage> {
  const data = await fetchGraphQL<{ projects: ProjectPage[] }>(
    getProjectsPageQuery,
    { slug },
  );
  return data.projects[0];
}
