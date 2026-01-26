import { Code as CodeTheme } from "bright";
import type { ReactNode } from "react";
import Code from "./components/blog/Code";
import { createHeading } from "./components/blog/CreateHeading";
import { CustomLink } from "./components/blog/CustomLink";
import Note from "./components/blog/Note";
import { OrderedList } from "./components/blog/OrderedList";
import { UnorderedList } from "./components/blog/UnorderedList";
import Wrapper from "./components/blog/Wrapper";

export type ChildrenAsProps = {
  children: ReactNode;
};

const components = {
  wrapper: Wrapper,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  Code: Code,
  code: Code,
  pre: CodeTheme,
  Note: Note,
  ul: UnorderedList,
  ol: OrderedList
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
