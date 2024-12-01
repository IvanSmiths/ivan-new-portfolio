import { Code } from "bright";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import {
  AnchorHTMLAttributes,
  createElement,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import Note from "./Note";
import Sections from "./Sections";
import { lato } from "../../../utils/fonts";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type AnchorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type PreProps = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

export type ChildrenAsProps = {
  children: ReactNode;
};

Code.theme = {
  dark: "nord",
  light: "github-light",
};

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string | undefined;
}

function CustomLink(props: CustomLinkProps) {
  let { href } = props;
  if (!href) {
    return;
  }
  if (href.startsWith("/")) {
    return (
      <Link className="text-lg font-bold underline" href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a className="font-bold underline" {...props} />;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-lg font-bold underline"
      {...props}
    />
  );
}

function slugify(str: ReactNode) {
  if (str == null) {
    return "";
  }
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  // eslint-disable-next-line react/display-name
  return ({ children }: HeadingProps): ReactElement => {
    let slug: string = slugify(children);
    return createElement(
      `h${level}`,
      {
        id: slug,
        className: `${lato.className} font-bold text-4xl -mb-small mt-regular`,
      },
      children,
    );
  };
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: (props: AnchorProps) => (
    <CustomLink {...props}>{props.children}</CustomLink>
  ),
  code: (props: any) => (
    <code
      className="rounded-lg bg-lighter px-2 py-1 font-bold dark:bg-darker"
      {...props}
    >
      {props.children}
    </code>
  ),
  pre: (props: PreProps) => <Code {...props}>{props.children}</Code>,
  Note: (props: ChildrenAsProps) => <Note {...props}>{props.children}</Note>,
  Sections: (props: ChildrenAsProps) => (
    <Sections {...props}>{props.children}</Sections>
  ),
};

export function MDXComponents(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
