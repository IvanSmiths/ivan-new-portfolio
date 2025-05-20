import Link from "next/link";
import ArrowLeft from "../Icons/ArrowLeft";

type BreadcrumbProps = {
  label: string;
  url: string;
};

const Breadcrumb = ({ label, url }: BreadcrumbProps) => {
  return (
    <Link
      className="py-xs text-foreground-muted flex cursor-pointer items-center gap-1"
      href={url}
    >
      <ArrowLeft />
      {label}
    </Link>
  );
};

export default Breadcrumb;
