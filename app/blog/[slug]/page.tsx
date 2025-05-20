import { notFound } from "next/navigation";
import { getBlogPosts, Posts } from "../../../utils/fetch/getPosts";
import { generateMetadata } from "../../../utils/seo/blog/blogPostMetadata";
import { blogSchema } from "../../../utils/seo/Schemas";
import Hero from "../../../components/blog/Hero";
import { MDXComponents } from "../../../components/blog/MDXComponents";

export type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts: Posts[] = getBlogPosts();
  return posts?.map((post: Posts) => ({ slug: post?.slug }));
}

export { generateMetadata };

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params;

  const post: Posts | undefined = getBlogPosts().find(
    (post) => post.slug === slug,
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="mt-large grid">
        <Hero post={post.metadata} />
        <div className="relative col-span-full grid">
          <div className="mt-medium gap-regular col-span-full flex flex-col md:col-start-4 md:col-end-13 lg:col-end-10">
            <MDXComponents source={post.content} />
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema(post.metadata)),
        }}
      />
    </>
  );
}
