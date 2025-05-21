import {
  createElement,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

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

export function createHeading(level: number) {
  // eslint-disable-next-line react/display-name
  return ({ children }: HeadingProps): ReactElement => {
    let slug: string = slugify(children);
    return createElement(
      `h${level}`,
      {
        id: slug,
        className: "font-bold text-4xl -mb-sm mt-md",
      },
      children,
    );
  };
}
