import type { GetStaticProps } from "next";
import Blog from "../../components/blog/Blog";
import { Seo } from "../../components/global/seo";
import { description, title, url } from "../../utils/marketing/seo/blog/blogMetadata";
import { blogsSchema } from "../../utils/marketing/seo/blogs/blogsSchema";
import { getPosts } from "../../utils/queries/posts/getPosts";
import type { Post } from "../../utils/queries/posts/types";

export type BlogPageProps = {
  posts: Post[];
};

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <>
      <Seo
        title={title}
        description={description}
        url={url}
        type="website"
        schema={blogsSchema}
      />
      <div className="md:mt-3xl">
        <Blog posts={posts} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const posts: Post[] = getPosts();

  return {
    props: { posts }
  };
};
