import { getPost, getPosts, Posts } from "../../../utils/getPosts";
import { MDXComponents } from "./components/MDXComponents";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import { Metadata } from "next";
import { blogSchema } from "../../../utils/Schemas";

type BlogProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<
  { slug: string | undefined }[]
> {
  const posts: Posts[] = await getPosts();
  return posts?.map((post: Posts) => ({ slug: post?.slug }));
}

export const generateMetadata = async ({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> => {
  const post: Posts | undefined = (await getPosts()).find(
    (p) => p?.slug === params.slug,
  );
  return {
    title: post?.title,
    description: post?.excerpt,
    alternates: {
      canonical: `https://ivansmiths.com/blog/${params.slug}`,
    },
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      type: "article",
      images: `https://www.ivansmiths.com${post?.cover}`,
      publishedTime: post?.date,
      url: `https://ivansmiths.com/blog/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      images: `https://www.ivansmiths.com${post?.cover}`,
      description: post?.excerpt,
    },
  };
};

export default async function Post({ params }: BlogProps) {
  const post: Posts | undefined = await getPost(params.slug);
  console.log(post?.cover);
  if (!post) {
    return notFound();
  }

  return (
    <>
      <Navbar position={Position.Fixed} />
      <article className="mt-large grid">
        <Hero post={post} />
        <div className="col-span-full grid relative">
          <div className="md:col-start-4 md:col-end-10 col-span-full mt-medium flex flex-col gap-regular">
            <MDXComponents source={post!.body} />
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
