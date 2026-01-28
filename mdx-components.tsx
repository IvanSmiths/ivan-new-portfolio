import type { ReactNode } from "react";
import Code from "./components/blog/Code";
import { createHeading } from "./components/blog/CreateHeading";
import { CustomLink } from "./components/blog/CustomLink";
import Note from "./components/blog/Note";
import { OrderedList } from "./components/blog/OrderedList";
import { UnorderedList } from "./components/blog/UnorderedList";
import Wrapper from "./components/blog/Wrapper";

const components = {
  wrapper: Wrapper,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,

  pre: ({ children }: { children: ReactNode }) => children,
  code: Code,

  Note,
  ul: UnorderedList,
  ol: OrderedList
};

export function useMDXComponents() {
  return components;
}
