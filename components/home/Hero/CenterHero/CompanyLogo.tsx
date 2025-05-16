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
      className="group relative flex max-w-40 min-w-20 flex-1 items-center justify-center border border-dashed border-gray-100 p-4 transition duration-300 hover:bg-gray-50"
    >
      {[
        "top-0 -left-1",
        "top-0 -right-1",
        "bottom-0 -left-1",
        "bottom-0 -right-1",
      ].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} text-xs leading-0 font-bold text-gray-200`}
        >
          +
        </span>
      ))}
      <img
        src={src}
        alt={alt}
        className="h-10 w-full object-contain grayscale transition duration-300 group-hover:grayscale-0"
      />
    </Link>
  );
};

export default CompanyLogo;
