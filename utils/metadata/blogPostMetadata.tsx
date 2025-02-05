import { Metadata } from "next";
import { Params } from "../../app/blog/[slug]/page";
import { getBlogPosts, Posts } from "../fetch/getPosts";

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | undefined> {
  let post: Posts | undefined = getBlogPosts().find(
    (post) => post.slug === params.slug,
  );

  if (!post) {
    return;
  }

  let { title, publishedAt: publishedTime, excerpt, tags } = post.metadata;
  const ogImage = [
    {
      url: `https://ivansmiths.com/blog/${post.slug}/cover.png`,
      height: post.metadata.coverHeight,
      width: post.metadata.coverWidth,
      alt: title,
    },
  ];

  const creator: string = "Ivan Smiths";
  const robots: string = "index, follow";
  const category: string = "Technology & Computing";

  return {
    title,
    description: excerpt,
    keywords: tags,
    creator,
    robots,
    category,
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      authors: ["Ivan Smiths"],
      tags: tags,
      publishedTime,
      url: `https://ivansmiths.com/blog/${post.slug}`,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      creator: "@Ivansmiths",
      creatorId: "1303746727594405894",
      description: excerpt,
      images: ogImage,
    },
  };
}
