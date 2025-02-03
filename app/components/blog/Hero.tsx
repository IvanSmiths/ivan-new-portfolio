import { FC } from "react";
import Blob from "./Blob";
import Dot from "../global/Dot";
import { Metadata } from "../../../utils/getPosts";
import { bebas_neue } from "../../../utils/fonts";

type PostProps = {
  post: Metadata;
};

const Hero: FC<PostProps> = ({ post }) => {
  const tags: string[] = post.tags.split(",");
  return (
    <>
      <Blob />
      <section
        data-testid="blogPostHeroSection"
        className="col-span-full flex flex-col items-center justify-center gap-small md:col-start-3 md:col-end-11"
      >
        <span data-cy="blogPageCategory" className="font-bold">
          {post.category}
        </span>
        <h1
          data-cy="blogPageTitle"
          className={`${bebas_neue.className} h-full bg-gradient-to-r from-darker via-darker to-dark bg-clip-text text-center text-5xl text-transparent dark:from-light dark:via-lighter dark:to-lighter md:text-7xl xl:text-8xl`}
        >
          {post.title}
        </h1>
        <h2 data-cy="blogPageExcerpt" className="text-center text-lg leading-7">
          {post.excerpt}
        </h2>
        <div className="flex flex-wrap items-center gap-smallest max-sm:flex-col">
          <span className="font-bold">
            Published:{" "}
            <time
              data-cy="blogPageDate"
              className="font-bold"
              dateTime={post.date}
            >
              {new Date(post.date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
          <div className="hidden sm:block">
            <Dot dimension="small" />
          </div>
          <span data-cy="blogPageTime" className="font-bold">
            {post.time} minutes read
          </span>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-smallest">
          {tags.map((tag: string, index: number) => (
            <li
              className="flex items-center justify-center gap-smallest"
              key={index}
            >
              <span data-cy="blogPageTag">{tag}</span>
              <div className={index === tags.length - 1 ? "hidden" : ""}>
                <Dot dimension="small" />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <div className="col-span-full mt-small md:col-start-2 md:col-end-12">
        <img
          data-cy="blogPageCover"
          className="w-full"
          fetchPriority="high"
          src={post.cover}
          alt={post.coverAlt}
          width={post.coverWidth}
          height={post.coverHeight}
        />
      </div>
    </>
  );
};

export default Hero;
