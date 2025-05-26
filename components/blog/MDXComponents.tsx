import { Code as CodeTheme } from "bright";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { ReactNode } from "react";
import Note from "./Note";
import { CustomLink } from "./CustomLink";
import { createHeading } from "./CreateHeading";
import Code from "./Code";
import { UnorderedList } from "./UnorderedList";
import { OrderedList } from "./OrderedList";

export type ChildrenAsProps = {
  children: ReactNode;
};

const components = {
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
  ol: OrderedList,
};

export function MDXComponents(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
