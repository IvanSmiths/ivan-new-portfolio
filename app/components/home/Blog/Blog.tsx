import Link from "next/link";
import { FC } from "react";
import { getBlogPosts, Posts } from "../../../../utils/fetch/getPosts";

const Blog: FC = () => {
  const posts: Posts[] = getBlogPosts();
  return (
    <div data-testid="homeBlogSection" className="my-medium grid">
      <div className="col-span-full flex flex-col md:col-start-4 md:col-end-13">
        {posts.map((post: Posts, index: number) => (
          <div key={index}>
            <div className="h-[1px] w-full bg-dark dark:bg-light"></div>
            <Link
              data-testid={`blogPostLink${index}`}
              data-cy="blogPost"
              className="group flex min-h-32 flex-col items-start justify-center gap-small transition hover:bg-dark dark:hover:bg-light md:flex-row md:items-center md:justify-between md:px-small"
              href={`blog/${post?.slug}`}
            >
              <div className="flex flex-col items-start gap-small md:flex-row md:items-center md:gap-medium">
                <span
                  data-cy="blogPostIndex"
                  className="hidden transition group-hover:text-light dark:group-hover:text-dark md:block"
                >
                  0{index + 1}
                </span>
                <h3
                  data-cy="blogPostTitle"
                  className="text-left text-xl font-semibold transition group-hover:text-light dark:group-hover:text-dark md:text-3xl"
                >
                  {post?.metadata.title}
                </h3>
              </div>
              <div className="flex min-w-fit flex-row gap-smallest md:ml-regular md:flex-col md:text-right">
                <span
                  data-cy="blogPostCategory"
                  className="transition group-hover:text-light dark:group-hover:text-dark"
                >
                  {post?.metadata.category}
                </span>
                <time
                  data-cy="blogPostDate"
                  className="transition group-hover:text-light dark:group-hover:text-dark"
                  dateTime={post?.metadata.date}
                >
                  {post?.metadata.date
                    ? new Date(post?.metadata.date).toLocaleDateString(
                        "en-us",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )
                    : "Date not available"}
                </time>
                <span
                  data-cy="blogPostTime"
                  className="transition group-hover:text-light dark:group-hover:text-dark"
                >
                  {post?.metadata.time} min to read
                </span>
              </div>
            </Link>
            <div className="h-[1px] w-full bg-dark dark:bg-light"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
