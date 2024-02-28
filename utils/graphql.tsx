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
