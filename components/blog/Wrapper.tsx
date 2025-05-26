import { ReactNode } from "react";
import TableOfContents from "./TableOfContents";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <article className="gap-lg pt-2xl flex w-full flex-col items-center">
      <div className="flex w-full pl-60">
        <div className="gap-md p-md border-background-muted flex w-9/12 flex-col border border-r-0">
          {children}
        </div>
        <TableOfContents />
      </div>
    </article>
  );
};

export default Wrapper;
