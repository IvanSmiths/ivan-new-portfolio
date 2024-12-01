import {
  ApiResponseWorkPage,
  ApiResponseWorks,
  WorkPage,
  Works,
} from "./graphqlTypes";
import { getWorksPageQuery, GetWorksQuery } from "./graphqlQueries";

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
      query: GetWorksQuery,
    }),
  });
  const responseData: ApiResponseWorks = await response.json();
  return responseData.data.works;
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
      query: getWorksPageQuery,
      variables: {
        slug: slug,
      },
    }),
  });
  const responseDataPage: ApiResponseWorkPage = await response.json();
  return responseDataPage.data.works[0];
}
