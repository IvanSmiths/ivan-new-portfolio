import Link from "next/link";
import type { BlogPageProps } from "../../pages/blog";
import { formatDate } from "../../utils/formatters/formatDate";
import type { Post } from "../../utils/queries/posts/types";
import { dm_mono } from "../../utils/style/fonts/fonts";

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <main className="p-sm gap-sm flex flex-wrap">
      {posts.map((post: Post, index: number) => (
        <Link
          scroll={false}
          key={index}
          className={`group hover:bg-foreground border-background-muted gap-sm hover:border-foreground p-md flex w-96 flex-col border`}
          href={`blog/${post?.slug}`}
        >
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
          <h2 className="group-hover:text-background text-1xl font-medium transition md:text-4xl">
            {post.title}
          </h2>
          <h3 className="group-hover:text-background text-sm transition">
            {post.description}
          </h3>
        </Link>
      ))}
    </main>
  );
}
