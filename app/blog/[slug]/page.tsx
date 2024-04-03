import { getPost, getPosts, Posts } from "../../../utils/getPosts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "./components/MDXComponents";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import Navbar, { Position } from "../../globalComponents/Navbar/Navbar";
import { Metadata } from "next";

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
  };
};

export default async function Post({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post: Posts | undefined = await getPost(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <Navbar position={Position.Fixed} />
      <article className="mt-large grid">
        <Hero post={post} />
        <main className="col-start-3 col-end-11 mt-medium flex flex-col gap-small">
          <MDXRemote source={post!.body} components={{ ...MDXComponents }} />
        </main>
      </article>
    </>
  );
}
