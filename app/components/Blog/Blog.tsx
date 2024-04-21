import { FC } from "react";
import { getBlogPosts, Posts } from "../../../utils/getPosts";
import Link from "next/link";

const Blog: FC = () => {
  const posts: any = getBlogPosts();
  console.log("Number of posts:", posts.length); // Log the length of the posts array
  console.log("Posts:", posts); // Log the entire posts arr
  return (
    <div className="grid md:m-0">
      <span className="md:col-start-1 max-sm:mb-small md:col-end-3 col-span-full lato">
        Latest blogposts
      </span>
      <div className="md:col-start-4 md:col-end-13 col-span-full flex flex-col">
        {posts.map((post: Posts, index: number) => {
          console.log("Mapping post:", post); // Log each post as it's being mapped
          return (
            <div key={index}>
              <Link
                data-cy="blogPost"
                className="flex md:justify-between justify-center gap-small flex-col md:flex-row md:items-center items-start md:px-small hover:bg-primary min-h-32 transition group"
                href={`blog/${post?.slug}`}
              >
                <div className="flex md:gap-medium gap-small flex-col md:flex-row items-start md:items-center">
                  <span
                    data-cy="blogPostIndex"
                    className="lato group-hover:text-secondaryLight hidden md:block transition"
                  >
                    0{index + 1}
                  </span>
                  <h3
                    data-cy="blogPostTitle"
                    className="font-semibold md:text-3xl text-xl text-left group-hover:text-secondary transition"
                  >
                    {post?.metadata.title}
                  </h3>
                </div>
                <div className="flex flex-row md:ml-regular md:flex-col gap-smallest min-w-fit md:text-right">
                  <span
                    data-cy="blogPostCategory"
                    className="lato group-hover:text-secondaryLight transition"
                  >
                    {post?.metadata.category}
                  </span>
                  <time
                    data-cy="blogPostDate"
                    className="lato group-hover:text-secondaryLight transition"
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
                    className="lato group-hover:text-secondaryLight transition"
                  >
                    {post?.metadata.time} min to read
                  </span>
                </div>
              </Link>
              <div className="h-[1px] bg-primaryLight w-full"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
