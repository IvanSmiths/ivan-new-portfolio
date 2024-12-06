import {
  ApiResponseWorkPage,
  ApiResponseWorks,
  WorkPage,
  Works,
} from "./graphqlTypes";
import { getWorksPageQuery, GetWorksQuery } from "./graphqlQueries";

function getEndpoint(): string {
  const endpoint = process.env.HYGRAPH_ENDPOINT;
  if (!endpoint) {
    throw new Error("Environment variable HYGRAPH_ENDPOINT is not set.");
  }
  return endpoint;
}

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const response = await fetch(getEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`,
    );
  }

  const result = await response.json();
  if (result.errors) {
    throw new Error(
      result.errors.map((error: any) => error.message).join(", "),
    );
  }

  return result.data;
}

export async function getWorks(): Promise<Works[]> {
  const data = await fetchGraphQL<ApiResponseWorks>(GetWorksQuery);
  return data.works;
}

export async function getWorksPage(slug: string): Promise<WorkPage> {
  const data = await fetchGraphQL<ApiResponseWorkPage>(getWorksPageQuery, {
    slug,
  });
  return data.works[0];
}
