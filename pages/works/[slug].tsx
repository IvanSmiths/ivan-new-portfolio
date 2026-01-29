import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import { Seo } from "../../components/global/seo";
import Details from "../../components/work/Details/Details";
import Images from "../../components/work/Images";
import PageTemplate from "../../components/work/PageTemplate";
import type { WorkProjectPage } from "../../utils/data/types";
import worksData from "../../utils/data/works";
import { pageSchema } from "../../utils/marketing/seo/work/pageSchema";
import { pagesSchema } from "../../utils/marketing/seo/works/pagesSchemas";

interface WorkProps {
  entry: WorkProjectPage;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (worksData as WorkProjectPage[]).map((work) => ({
    params: { slug: work.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<WorkProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const entry = worksData.find((work) => work.slug === slug);

  if (!entry) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      entry
    }
  };
};

const Work: FC<WorkProps> = ({ entry }) => {
  return (
    <>
      <Seo
        title={entry.title}
        description={entry.metaDescription}
        url={entry.url}
        image={entry.homeImage.url}
        type="website"
        schema={pagesSchema}
      />
      <PageTemplate
        entry={entry}
        schema={pageSchema(entry, "works")}
        renderContent={(work) => (
          <>
            <Details work={work} />
            <Images work={work} />
          </>
        )}
      />
    </>
  );
};

export default Work;
