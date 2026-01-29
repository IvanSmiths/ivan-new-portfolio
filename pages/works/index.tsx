import { Seo } from "../../components/global/seo";
import TemplateSection from "../../components/works/TemplateSection";
import worksData from "../../utils/data/works";
import { url } from "../../utils/marketing/seo/blog/blogMetadata";
import { pagesSchema } from "../../utils/marketing/seo/works/pagesSchemas";
import { description, path, title } from "../../utils/marketing/seo/works/worksMetadata";

const WorksPage = () => {
  return (
    <>
      <Seo
        title={title}
        description={description}
        url={url}
        type="website"
        schema={pagesSchema}
      />
      <TemplateSection path={path} works={worksData} />
    </>
  );
};

export default WorksPage;
