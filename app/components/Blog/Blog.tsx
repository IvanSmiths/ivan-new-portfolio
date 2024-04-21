import { FC } from "react";
import getPosts, { Posts } from "../../../utils/getPosts";
import Link from "next/link";

const Blog: FC = async () => {
  const posts: Posts[] = await getPosts();
  return (
    <div className="grid md:m-0">
      <span className="md:col-start-1 max-sm:mb-small md:col-end-3 col-span-full lato">
        Latest blogposts
      </span>
      <div className="md:col-start-4 md:col-end-13 col-span-full flex flex-col">
        {posts.map((post: Posts) => (
          <Link key={post?.slug} href={`blog/${post?.slug}`}>
            <div>{post?.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
