import { getBlogPosts } from "../../../utils/getPosts";
import { MDXComponents } from "./components/MDXComponents";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import { blogSchema } from "../../../utils/Schemas";

export async function generateStaticParams() {
  const posts: any = getBlogPosts();
  return posts?.map((post: any) => ({ slug: post?.slug }));
}

export default async function Post({ params }: any) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar position={Position.Fixed} />
      <article className="mt-large grid">
        <Hero post={post} />
        <div className="col-span-full grid relative">
          <div
            data-cy="blogPageBody"
            className="md:col-start-4 md:col-end-10 col-span-full mt-medium flex flex-col gap-regular"
          >
            <MDXComponents source={post!.content} />
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema(post)),
        }}
      />
    </>
  );
}
