import { Seo } from "../../../components/global/seo";
import BlogPost from "../../../utils/data/blog/add-google-analytics-to-next-js-without-third-parties-package/index.mdx";
import {
  data,
  postSchema
} from "../../../utils/data/blog/add-google-analytics-to-next-js-without-third-parties-package/postMetadata";

const Page = () => {
  return (
    <>
      <Seo
        title={data.title}
        description={data.description}
        url={data.url}
        image={data.cover}
        imageAlt={data.coverAlt}
        type="article"
        publishedAt={data.publishedAt}
        category={data.category}
        tags={data.tags}
        schema={postSchema}
      />
      <BlogPost />
    </>
  );
};

export default Page;
