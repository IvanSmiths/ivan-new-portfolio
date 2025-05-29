import Link from "next/link";
import { FC } from "react";
import { formatDate } from "../../utils/formatters/formatDate";
import { dm_mono } from "../../utils/fonts/fonts";
import { getPosts } from "../../utils/fetch/posts/getPosts";
import { Post } from "../../utils/fetch/posts/types";

const Blog: FC = async () => {
  const posts: Post[] = await getPosts();
  return (
    <main className="p-sm gap-sm flex flex-wrap">
      {posts.map((post: Post, index: number) => (
        <Link
          key={index}
          className={`group animate-fadeInUp [animation-delay:${index + 1}00ms] hover:bg-foreground border-background-muted gap-sm hover:border-foreground p-sm flex w-[600px] flex-col border opacity-0 transition`}
          href={`blog/${post?.slug}`}
        >
          <img
            src={post.cover}
            className="w-full object-cover"
            alt="blogpost main image"
          />
          <div className="gap-sm flex items-center">
            <time
              className={`group-hover:text-background ${dm_mono} text-xs uppercase transition`}
              dateTime={post.publishedAt}
            >
              {formatDate(post.publishedAt)}
            </time>
            <span
              className={`group-hover:text-background ${dm_mono} text-xs uppercase transition`}
            >
              {post.category}
            </span>
          </div>
          <h2 className="group-hover:text-background text-2xl font-medium transition md:text-4xl">
            {post.title}
          </h2>
          <h3 className="group-hover:text-background text-sm transition">
            {post.description}
          </h3>
        </Link>
      ))}
    </main>
  );
};

export default Blog;
