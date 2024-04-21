import type { Metadata } from "next";
import { getBlogPosts, Posts } from "../../../utils/getPosts";
import { MDXComponents } from "./components/MDXComponents";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import { blogSchema } from "../../../utils/Schemas";

type Params = {
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
}: Params): Promise<Metadata | undefined> {
  let post: Posts | undefined = getBlogPosts().find(
    (post) => post.slug === params.slug,
  );

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    excerpt,
    image,
    tags,
  } = post.metadata;
  let ogImage = image
    ? `https://ivansmiths.com${image}`
    : `https://ivansmiths.com/og?title=${title}`;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      authors: ["Ivan Smiths"],
      tags: tags,
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
      creator: "@Ivansmiths",
      creatorId: "1303746727594405894",
      description: excerpt,
      images: [ogImage],
    },
  };
}

export default async function Post({ params }: Params) {
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
          __html: JSON.stringify(blogSchema(post.metadata)),
        }}
      />
    </>
  );
}
