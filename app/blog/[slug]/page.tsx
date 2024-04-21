import type { Metadata } from "next";
import { getBlogPosts } from "../../../utils/getPosts";
import { MDXComponents } from "./components/MDXComponents";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import { blogSchema } from "../../../utils/Schemas";
import { Posts } from "../../components/Blog/Blog";

type BlogProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts: Posts[] = getBlogPosts();
  return posts?.map((post: Posts) => ({ slug: post?.slug }));
}

export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata | undefined> {
  let post: Posts | undefined = getBlogPosts().find(
    (post) => post.slug === params.slug,
  );

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? `https://ivansmiths.com${image}`
    : `https://ivansmiths.com/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://ivansmiths.com/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Post({ params }: BlogProps) {
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
