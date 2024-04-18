import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { Code } from "bright";
import { lato } from "../../../../utils/fonts";
import Note from "./Note";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type ParagraphProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

type AnchorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type ListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

type StrongProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

type NoteProps = {
  children: ReactNode;
};

Code.theme = {
  dark: "dark-plus",
  light: "github-light",
};

const components = {
  h1: (props: HeadingProps) => (
    <h1
      {...props}
      className={`${lato.className} font-bold md:text-5xl text-5xl -mb-small mt-regular`}
    >
      {props.children}
    </h1>
  ),
  h2: (props: HeadingProps) => (
    <h2
      {...props}
      className={`${lato.className} font-bold text-4xl -mb-small mt-regular`}
    >
      {props.children}
    </h2>
  ),
  h3: (props: HeadingProps) => (
    <h3
      {...props}
      className={`${lato.className} font-bold text-4xl -mb-small mt-regular`}
    >
      {props.children}
    </h3>
  ),
  h4: (props: HeadingProps) => (
    <h4
      {...props}
      className={`${lato.className} font-bold text-4xl -mb-small mt-regular`}
    >
      {props.children}
    </h4>
  ),
  h5: (props: HeadingProps) => (
    <h5
      {...props}
      className={`${lato.className} font-bold text-4xl -mb-small mt-regular`}
    >
      {props.children}
    </h5>
  ),
  h6: (props: HeadingProps) => (
    <h6
      {...props}
      className={`${lato.className} font-bold text-4xl -mb-small mt-regular`}
    >
      {props.children}
    </h6>
  ),
  p: (props: ParagraphProps) => (
    <p
      {...props}
      className={`${lato.className} leading-8 text-lg text-primaryLight`}
    >
      {props.children}
    </p>
  ),
  strong: (props: StrongProps) => (
    <strong {...props} className="text-lg font-bold">
      {props.children}
    </strong>
  ),
  a: (props: AnchorProps) => (
    <a
      {...props}
      target="_blank"
      rel="noopener"
      className="text-lg underline font-bold"
    >
      {props.children}
    </a>
  ),
  li: (props: ListProps) => (
    <li {...props} className="text-lg leading-8 text-primaryLight list-disc">
      {props.children}
    </li>
  ),
  pre: (props: PreProps) => <Code {...props}>{props.children}</Code>,
  Note: (props: NoteProps) => <Note {...props}>{props.children}</Note>,
};

export function MDXComponents(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
