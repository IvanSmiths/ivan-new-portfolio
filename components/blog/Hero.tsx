import { FC } from "react";
import Blob from "./Blob";
import Dot from "../global/Dot";
import { Metadata } from "../../utils/fetch/getPosts";
import { bebas_neue } from "../../utils/fonts";

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
        className="gap-small col-span-full flex flex-col items-center justify-center md:col-start-3 md:col-end-11"
      >
        <span className="font-bold">{post.category}</span>
        <h1
          className={`${bebas_neue.className} from-darker via-darker to-dark foreground h-full bg-gradient-to-r bg-clip-text text-center text-5xl text-transparent md:text-7xl xl:text-8xl`}
        >
          {post.title}
        </h1>
        <h2 className="text-center text-lg leading-7">{post.excerpt}</h2>
        <div className="gap-smallest flex flex-wrap items-center max-sm:flex-col">
          <span className="font-bold">
            Published:{" "}
            <time className="font-bold" dateTime={post.date}>
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
          <span className="font-bold">{post.time} minutes read</span>
        </div>
        <ul className="gap-smallest flex flex-wrap items-center justify-center">
          {tags.map((tag: string, index: number) => (
            <li
              className="gap-smallest flex items-center justify-center"
              key={index}
            >
              <span>{tag}</span>
              <div className={index === tags.length - 1 ? "hidden" : ""}>
                <Dot dimension="small" />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-small col-span-full md:col-start-2 md:col-end-12">
        <img
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
