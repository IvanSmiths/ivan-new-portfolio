import Dot from "../global/Dot";
import { Metadata } from "../../utils/fetch/getPosts";
import { dm_mono } from "../../utils/fonts/fonts";

type PostProps = {
  post: Metadata;
};

const Hero = ({ post }: PostProps) => {
  const tags: string[] = post.tags.split(",");
  return (
    <header className="gap-sm flex w-3/5 flex-col items-center justify-center text-center">
      <span
        className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
      >
        {post.category}
      </span>
      <h1 className="text-6xl font-bold uppercase">{post.title}</h1>
      <h2>{post.excerpt}</h2>
      <div className="gap-xs flex flex-wrap items-center max-sm:flex-col">
        <span>
          Published:{" "}
          <time dateTime={post.date}>
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
        <span>{post.time} minutes read</span>
      </div>
      <ul className="gap-xs flex flex-wrap items-center justify-center">
        {tags.map((tag: string, index: number) => (
          <li className="gap-xs flex items-center justify-center" key={index}>
            <span
              className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
            >
              {tag}
            </span>
            <div className={index === tags.length - 1 ? "hidden" : ""}>
              <Dot dimension="small" />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-sm">
        <img
          className="w-full"
          fetchPriority="high"
          src={post.cover}
          alt={post.coverAlt}
          width={post.coverWidth}
          height={post.coverHeight}
        />
      </div>
    </header>
  );
};

export default Hero;
