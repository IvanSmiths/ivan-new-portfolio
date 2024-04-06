import { Bebas_Neue } from "next/font/google";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  preload: true,
  variable: "--font-bebas_neue",
  display: "swap",
});

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

type StrongProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const MDXComponents = {
  h1: (props: HeadingProps) => (
    <h1
      {...props}
      className={`${bebas_neue.className} font-bold md:text-7xl text-5xl`}
    >
      {props.children}
    </h1>
  ),
  h2: (props: HeadingProps) => (
    <h2
      {...props}
      className={`${bebas_neue.className} font-bold md:text-6xl text-5xl`}
    >
      {props.children}
    </h2>
  ),
  h3: (props: HeadingProps) => (
    <h3 {...props} className={`${bebas_neue.className} font-bold text-5xl`}>
      {props.children}
    </h3>
  ),
  h4: (props: HeadingProps) => (
    <h4 {...props} className={`${bebas_neue.className} font-bold text-4xl`}>
      {props.children}
    </h4>
  ),
  h5: (props: HeadingProps) => (
    <h5 {...props} className={`${bebas_neue.className} font-bold text-4xl`}>
      {props.children}
    </h5>
  ),
  h6: (props: HeadingProps) => (
    <h6 {...props} className={`${bebas_neue.className} font-bold text-4xl`}>
      {props.children}
    </h6>
  ),
  p: (props: ParagraphProps) => (
    <p {...props} className="text-lg">
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
    <li {...props} className="text-lg list-disc">
      {props.children}
    </li>
  ),
};
