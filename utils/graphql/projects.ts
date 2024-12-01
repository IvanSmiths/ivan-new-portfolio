import { ApiResponseProjects } from "./graphqlTypes";

export async function getProjects(): Promise<any> {
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
