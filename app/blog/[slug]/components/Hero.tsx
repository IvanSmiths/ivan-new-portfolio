import { FC } from "react";
import Blob from "./Blob";
import { Bebas_Neue } from "next/font/google";
import Dot from "../../../globalComponents/Dot";

type PostProps = {
  post: {
    category: string;
    title: string;
    excerpt: string;
    date: string;
    time: number;
  };
};

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas_neue",
  display: "swap",
});

const Hero: FC<PostProps> = ({ post }) => {
  return (
    <div className="w-full flex justify-center mt-medium">
      <Blob />
      <div className="flex flex-col gap-small justify-center items-center sm:w-8/12 w-11/12">
        <span className="mono">{post.category}</span>
        <h1
          className={`${bebas_neue.className} md:text-7xl xl:text-8xl text-3xl text-center bg-gradient-to-r from-primaryAccent via-primaryAccent to-primaryLight font-semibold text-transparent h-full bg-clip-text`}
        >
          {post.title}
        </h1>
        <h2 className="text-center text-lg text-primary leading-[24px]">
          {post.excerpt}
        </h2>
        <div className="flex items-center flex-wrap gap-2">
          <span>Published:</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <Dot />
          <span>{post.time} minutes read</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
