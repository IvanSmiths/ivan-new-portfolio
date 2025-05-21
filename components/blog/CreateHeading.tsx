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

function slugify(str: ReactNode): string {
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
  return ({ children, ...props }: HeadingProps): ReactElement => {
    const slug = slugify(children);

    let fontSize: string;
    let padding: string;

    // Adjust styling based on heading level
    switch (level) {
      case 1:
        fontSize = "text-4xl";
        padding = "mt-8 mb-4";
        break;
      case 2:
        fontSize = "text-3xl";
        padding = "mt-6 mb-3";
        break;
      case 3:
        fontSize = "text-2xl";
        padding = "mt-5 mb-2";
        break;
      default:
        fontSize = "text-xl";
        padding = "mt-4 mb-2";
    }

    return createElement(
      `h${level}`,
      {
        id: slug,
        className: `font-bold ${fontSize} ${padding}`,
        ...props,
      },
      children,
    );
  };
}
