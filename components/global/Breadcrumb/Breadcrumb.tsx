import Link from "next/link";

type BreadcrumbProps = {
  label: string;
  url: string;
};

const Breadcrumb = ({ label, url }: BreadcrumbProps) => {
  return (
    <Link
      className="pb-xs text-foreground-muted inline-block cursor-pointer"
      href={url}
    >
      {label}
    </Link>
  );
};

export default Breadcrumb;
