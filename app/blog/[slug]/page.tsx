import { getPost, getPosts } from "../../../utils/fetchPosts";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const components = {
  h1: (props) => (
    <h1 {...props} className="text-red-500">
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
  const post = await getPost(params.slug);
  console.log(post);
  return <MDXRemote source={post?.body} components={{ ...components }} />;
}
