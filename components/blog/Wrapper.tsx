import { ReactNode } from "react";
import TableOfContents from "./TableOfContents";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <article className="gap-lg md:pt-2xl pt-sm flex w-full flex-col items-center">
      <div className="flex w-full md:w-9/12">
        <div className="gap-md p-md flex w-full flex-col md:w-9/12">
          {children}
        </div>
        <TableOfContents />
      </div>
    </article>
  );
};

export default Wrapper;
