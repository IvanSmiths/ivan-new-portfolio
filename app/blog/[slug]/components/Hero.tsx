import { FC } from "react";
import Blob from "./Blob";
import { Bebas_Neue } from "next/font/google";
import Dot from "../../../globalComponents/Dot";

type PostProps = {
  post: {
    category: string;
    cover?: string;
    coverAlt?: string;
    coverWidth?: number;
    coverHeight?: number;
    title: string;
    excerpt: string;
    date: string;
    time: number;
    tags: string;
  };
};

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas_neue",
  display: "swap",
});

const Hero: FC<PostProps> = ({ post }) => {
  const tags: string[] = post.tags.split(" ");
  return (
    <>
      <Blob />
      <section className="md:col-start-3 md:col-end-11 col-span-full flex flex-col gap-small justify-center items-center">
        <span className="mono">{post.category}</span>
        <h1
          className={`${bebas_neue.className} md:text-7xl xl:text-8xl text-3xl text-center bg-gradient-to-r from-primaryAccent via-primaryAccent to-primaryLight font-semibold text-transparent h-full bg-clip-text`}
        >
          {post.title}
        </h1>
        <h2 className="text-center text-lg text-primary leading-[24px]">
          {post.excerpt}
        </h2>
        <div className="flex max-sm:flex-col items-center flex-wrap gap-smallest">
          <span className="mono">
            Published:{" "}
            <time className="mono" dateTime={post.date}>
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
          <span className="mono">{post.time} minutes read</span>
        </div>
        <ul className="flex justify-center items-center gap-smallest">
          {tags.map((tag: string, index: number) => (
            <li
              className="flex justify-center items-center gap-smallest"
              key={index}
            >
              <span className="mono">{tag}</span>
              <div className={index === tags.length - 1 ? "hidden" : ""}>
                <Dot dimension="small" />
              </div>
            </li>
          ))}
        </ul>
      </section>
      {post.cover ? (
        <div className="col-start-2 col-end-12 mt-small">
          <img
            className="w-full"
            src={post.cover}
            alt={post.coverAlt}
            width={post.coverWidth}
            height={post.coverHeight}
          />
        </div>
      ) : null}
    </>
  );
};

export default Hero;
