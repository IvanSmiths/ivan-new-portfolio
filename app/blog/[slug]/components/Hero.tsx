import { FC } from "react";
import Blob from "./Blob";
import Dot from "../../../globalComponents/Dot";

type PostProps = {
  post: {
    category: string;
    cover: string;
    coverAlt: string;
    coverWidth: number;
    coverHeight: number;
    title: string;
    excerpt: string;
    date: string;
    time: number;
    tags: string;
  };
};

const Hero: FC<any> = ({ post }) => {
  return (
    <>
      <Blob />
      <section className="md:col-start-3 md:col-end-11 col-span-full flex flex-col gap-small justify-center items-center">
        <span data-cy="blogPageCategory" className="lato font-bold">
          {post.metadata.category}
        </span>
        <h1
          data-cy="blogPageTitle"
          className="bebas md:text-7xl xl:text-8xl text-5xl text-center bg-gradient-to-r from-primaryAccent via-primaryAccent to-primaryLight text-transparent h-full bg-clip-text"
        >
          {post.metadata.title}
        </h1>
        <h2 data-cy="blogPageExcerpt" className="text-center leading-7 text-lg">
          {post.metadata.excerpt}
        </h2>
        <div className="flex max-sm:flex-col items-center flex-wrap gap-smallest">
          <span className="lato font-bold">
            Published:{" "}
            <time
              data-cy="blogPageDate"
              className="lato font-bold"
              dateTime={post.metadata.date}
            >
              {new Date(post.metadata.date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
          <div className="hidden sm:block">
            <Dot dimension="small" />
          </div>
          <span data-cy="blogPageTime" className="lato font-bold">
            {post.metadata.time} minutes read
          </span>
        </div>
      </section>
      <div className="md:col-start-2 md:col-end-12 col-span-full mt-small">
        <img
          data-cy="blogPageCover"
          className="w-full"
          src={post.metadata.cover}
          alt={post.metadata.coverAlt}
          width={post.metadata.coverWidth}
          height={post.metadata.coverHeight}
        />
      </div>
    </>
  );
};

export default Hero;
