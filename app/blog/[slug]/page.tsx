import { notFound } from "next/navigation";
import { getBlogPosts, Posts } from "../../../utils/getPosts";
import { generateMetadata } from "../../../utils/metadata/blogPostMetadata";
import { blogSchema } from "../../../utils/metadata/Schemas";
import Footer from "../../globalComponents/Footer/Footer";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import Hero from "./components/Hero";
import { MDXComponents } from "./components/MDXComponents";

export type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts: Posts[] = getBlogPosts();
  return posts?.map((post: Posts) => ({ slug: post?.slug }));
}

export { generateMetadata };

export default async function Post(props: Params) {
  const params = await props.params;
  let post: Posts | undefined = getBlogPosts().find(
    (post) => post.slug === params.slug,
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar position={Position.Fixed} />
      <article className="mt-large grid">
        <Hero post={post.metadata} />
        <div className="relative col-span-full grid">
          <div
            data-cy="blogPageBody"
            className="col-span-full mt-medium flex flex-col gap-regular md:col-start-4 md:col-end-13 lg:col-end-10"
          >
            <MDXComponents source={post!.content} />
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema(post.metadata)),
        }}
      />
      <Footer />
    </>
  );
}
