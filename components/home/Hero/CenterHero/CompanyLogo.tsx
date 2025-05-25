import Link from "next/link";

type CompanyLogoProps = {
  src: string;
  alt: string;
  name: string;
  href: string;
  onHover: (name: string | null) => void;
};

const CompanyLogo = ({ src, alt, name, href, onHover }: CompanyLogoProps) => {
  return (
    <Link
      href={href}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      className="group hover:bg-foreground border-background-muted relative flex w-20 items-center justify-center border p-4 transition duration-300 lg:flex-1"
    >
      {[
        "top-0 -left-1",
        "top-0 -right-1",
        "bottom-0 -left-1",
        "bottom-0 -right-1",
      ].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} text-foreground-muted text-xs leading-0 font-bold`}
        >
          +
        </span>
      ))}
      <img
        src={src}
        alt={alt}
        height="32"
        width="32"
        className="h-8 w-fit object-contain grayscale transition duration-300 group-hover:grayscale-0 lg:h-12"
      />
    </Link>
  );
};

export default CompanyLogo;
