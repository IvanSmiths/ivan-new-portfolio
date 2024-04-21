import { FC } from "react";

const BlogPost: FC = async () => {
  return (
    <div className="grid md:m-0">
      <span className="md:col-start-1 max-sm:mb-small md:col-end-3 col-span-full lato">
        Latest blogposts
      </span>
      <div className="md:col-start-4 md:col-end-13 col-span-full flex flex-col"></div>
    </div>
  );
};

export default BlogPost;
