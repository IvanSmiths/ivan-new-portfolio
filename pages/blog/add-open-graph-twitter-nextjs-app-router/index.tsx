import { Seo } from "../../../components/global/seo";
import BlogPost from "../../../utils/data/blog/add-open-graph-twitter-nextjs-app-router/index.mdx";
import { data, postSchema } from "../../../utils/data/blog/add-open-graph-twitter-nextjs-app-router/postMetadata";

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
