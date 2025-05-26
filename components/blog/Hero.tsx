import Dot from "../global/Dot";
import { dm_mono } from "../../utils/fonts/fonts";
import { PostMetadata } from "../../utils/fetch/posts/types";

type PostProps = {
  post: PostMetadata;
};

const Hero = ({ post }: PostProps) => {
  return (
    <header className="gap-md flex flex-col items-center justify-center text-center">
      <span
        className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
      >
        {post.category}
      </span>
      <h1 className="text-6xl font-bold uppercase">{post.title}</h1>
      <h2>{post.description}</h2>
      <div className="gap-xs flex flex-wrap items-center max-sm:flex-col">
        <span>
          Published:{" "}
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </span>
      </div>
      <ul className="gap-xs flex flex-wrap items-center justify-center">
        {post.tags.map((tag: string, index: number) => (
          <li className="gap-xs flex items-center justify-center" key={index}>
            <span
              className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
            >
              {tag}
            </span>
            <div className={index === post.tags.length - 1 ? "hidden" : ""}>
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
        />
      </div>
    </header>
  );
};

export default Hero;
