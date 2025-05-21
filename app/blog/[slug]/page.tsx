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
    <div className="relative mt-20 flex w-full flex-col items-center">
      <article className="gap-lg px-xl flex w-full flex-col lg:w-3/5 lg:px-0">
        <Hero post={post.metadata} />
        <MDXComponents source={post.content} />
        <div className="hidden lg:col-span-4 lg:block">
          <TableOfContents />
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema(post.metadata)),
        }}
      />
    </div>
  );
}
