import Link from "next/link";
import ArrowLeft from "../Icons/ArrowLeft";

type BreadcrumbProps = {
  label: string;
  url: string;
};

const Breadcrumb = ({ label, url }: BreadcrumbProps) => {
  return (
    <Link
      className="py-xs pl-sm text-foreground-muted border-background-muted flex cursor-pointer items-center gap-1 border-b"
      href={url}
    >
      <ArrowLeft />
      {label}
    </Link>
  );
};

export default Breadcrumb;
