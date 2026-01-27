import Head from "next/head";
import TemplateSection from "../../components/works-projects/TemplateSection";
import worksData from "../../utils/data/works";
import { pagesSchema } from "../../utils/marketing/seo/works-projects/pagesSchemas";
import { description, path, title } from "../../utils/marketing/seo/works-projects/worksMetadata";

const WorksPage = () => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ivan Smiths" />
        <meta property="og:url" content={`https://ivansmiths.com${path}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@Ivansmiths" />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: cannot be avoided
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pagesSchema(path))
          }}
        />
      </Head>
      <TemplateSection path={path} works={worksData} />
    </>
  );
};

export default WorksPage;
