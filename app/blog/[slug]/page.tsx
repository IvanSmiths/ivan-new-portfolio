import { notFound } from "next/navigation";
import { getBlogPosts, Posts } from "../../../utils/fetch/getPosts";
import { generateMetadata } from "../../../utils/seo/blog/blogPostMetadata";
import { blogSchema } from "../../../utils/seo/Schemas";
import Hero from "../../../components/blog/Hero";
import { MDXComponents } from "../../../components/blog/MDXComponents";
import TableOfContents from "../../../components/blog/TableOfContents";

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
      <article className="gap-lg pt-2xl flex w-full flex-col items-center justify-center">
        <Hero post={post.metadata} />
        <div className="gap-xl flex">
          <div className="gap-lg flex w-full flex-col">
            <MDXComponents source={post.content} />
          </div>
          <div className="hidden lg:block">
            <TableOfContents />
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
