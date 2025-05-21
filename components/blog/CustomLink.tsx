import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string | undefined;
}

export function CustomLink(props: CustomLinkProps) {
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
