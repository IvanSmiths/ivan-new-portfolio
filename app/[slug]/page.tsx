type Work = {
  id: string;
  slug: string;
  workTitle: string;
};

type QueryResult = {
  works: Work[];
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
            createdAt
            id
            publishedAt
            slug
            updatedAt
            workTitle
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
  const works = await getWorks(params.slug);
  console.log(works);
  return (
    <main>
      {works.map((work: Work) => (
        <div key={work.id}>{work.workTitle}</div>
      ))}
    </main>
  );
}
