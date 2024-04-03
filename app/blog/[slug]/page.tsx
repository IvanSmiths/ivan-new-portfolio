import { getPost, getPosts, Posts } from "../../../utils/getPosts";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams(): Promise<
  { slug: string | undefined }[]
> {
  const posts: Posts[] = await getPosts();
  return posts?.map((post: Posts) => ({ slug: post?.slug }));
}

type H1 = { children: string };

const components = {
  h1: (props: H1) => (
    <h1 {...props} className="text-red-500 text-5xl">
      {props.children}
    </h1>
  ),
};
export default async function Post({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post: Posts | undefined = await getPost(params.slug);
  return <MDXRemote source={post!.body} components={{ ...components }} />;
}
