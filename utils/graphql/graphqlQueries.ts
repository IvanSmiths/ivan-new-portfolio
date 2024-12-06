export const GetWorksQuery = `
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
`;

export const getWorksPageQuery = `
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
        `;
