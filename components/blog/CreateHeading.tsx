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
    .replace(/--+/g, "-");
}

export function createHeading(level: number) {
  // eslint-disable-next-line react/display-name
  return ({ children, ...props }: HeadingProps): ReactElement => {
    const slug = slugify(children);

    let fontSize: string;
    let padding: string;

    switch (level) {
      case 1:
        fontSize = "md:text-4xl text-3xl";
        padding = "pt-xl";
        break;
      case 2:
        fontSize = "md:text-3xl text-2xl";
        padding = "pt-xl";
        break;
      case 3:
        fontSize = "md:text-2xl text-xl";
        padding = "pt-md";
        break;
      default:
        fontSize = "text-xl";
        padding = "pt-sm";
    }

    return createElement(
      `h${level}`,
      {
        id: slug,
        className: `font-bold ${fontSize} ${padding}`,
        ...props,
      },
      createElement(
        "a",
        {
          href: `#${slug}`,
          className: "no-underline hover:underline",
        },
        children,
      ),
    );
  };
}
