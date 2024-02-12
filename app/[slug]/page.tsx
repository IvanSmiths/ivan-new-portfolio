async function getWorks() {
  const response = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query Works {
          works {
            createdAt
            id
            publishedAt
            slug
            updatedAt
            workTitle
            }
          }
        `,
    }),
  });
  const { data } = await response.json();

  return data.works;
}

export default async function UniquePage() {
  const works = await getWorks();
  console.log(works);
  return (
    <main>
      {works.map((work) => (
        <div key={work.id}>{work.workTitle}</div>
      ))}
    </main>
  );
}
