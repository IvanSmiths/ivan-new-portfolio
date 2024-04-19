import { FC } from "react";
import getPosts, { Posts } from "../../../utils/getPosts";
import Link from "next/link";

const Blog: FC = async () => {
  const posts: Posts[] = await getPosts();
  return (
    <div className="grid md:m-0 mb-section">
      <span className="md:col-start-1 max-sm:mb-small md:col-end-3 col-span-full lato">
        Latest blogposts
      </span>
      <div className="md:col-start-4 md:col-end-13 col-span-full flex flex-col">
        {posts.map((post: Posts, index: number) => (
          <>
            <Link
              className="flex justify-between items-center px-small hover:bg-primary min-h-32 transition group"
              key={post?.slug}
              href={`blog/${post?.slug}`}
            >
              <div className="flex md:gap-medium gap-small items-center">
                <span className="lato group-hover:text-secondaryLight transition">
                  0{index + 1}
                </span>
                <h3 className="font-semibold md:text-3xl text-xl text-left group-hover:text-secondary transition">
                  {post?.title}
                </h3>
              </div>
              <div className="sm:flex ml-regular flex-col gap-smallest min-w-fit hidden text-right">
                <time
                  className="lato font-bold group-hover:text-secondaryLight transition"
                  dateTime={post?.date}
                >
                  {post?.date
                    ? new Date(post?.date).toLocaleDateString("en-us", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Date not available"}
                </time>
                <span className="lato group-hover:text-secondaryLight transition">
                  {post?.time} min to read
                </span>
              </div>
            </Link>
            <div className="h-[1px] bg-primaryLight w-full"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Blog;
