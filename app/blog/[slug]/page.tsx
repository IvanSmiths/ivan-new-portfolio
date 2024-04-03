import { getPost, getPosts, Posts } from "../../../utils/getPosts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "./components/MDXComponents";
import { notFound } from "next/navigation";
import Hero from "./components/Hero";
import Navbar from "../../globalComponents/Navbar/Navbar";

export async function generateStaticParams(): Promise<
  { slug: string | undefined }[]
> {
  const posts: Posts[] = await getPosts();
  return posts?.map((post: Posts) => ({ slug: post?.slug }));
}

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
      <Navbar />
      <article>
        <Hero post={post} />
        <MDXRemote source={post!.body} components={{ ...MDXComponents }} />
      </article>
    </>
  );
}
