import Link from "next/link";
import { FC } from "react";
import { getBlogPosts, Posts } from "../../utils/fetch/getPosts";
import { formatDate } from "../../utils/formatters/formatDate";
import { dm_mono } from "../../utils/fonts";

const Blog: FC = () => {
  const posts: Posts[] = getBlogPosts();
  return (
    <main className="p-sm gap-sm flex flex-wrap">
      {posts.map((post: Posts, index: number) => (
        <Link
          key={index}
          className="group hover:bg-foreground border-background-muted gap-sm hover:border-foreground p-sm flex w-[600px] flex-col border transition"
          href={`blog/${post?.slug}`}
        >
          <img
            src={post.metadata.cover}
            className="w-full object-cover"
            alt="blogpost main image"
          />
          <div className="gap-sm flex items-center">
            <time
              className={`group-hover:text-background ${dm_mono} text-xs uppercase transition`}
              dateTime={post.metadata.date}
            >
              {formatDate(post.metadata.date)}
            </time>
            <span
              className={`group-hover:text-background ${dm_mono} text-xs uppercase transition`}
            >
              {post.metadata.category}
            </span>
          </div>
          <h2 className="group-hover:text-background text-2xl font-medium transition md:text-4xl">
            {post.metadata.title}
          </h2>
          <h3 className="group-hover:text-background text-sm transition">
            {post.metadata.excerpt}
          </h3>
        </Link>
      ))}
    </main>
  );
};

export default Blog;
