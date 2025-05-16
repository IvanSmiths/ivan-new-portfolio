type CompanyLogoProps = {
  src: string;
  alt: string;
  name: string;
  onHover: (name: string | null) => void;
};

const CompanyLogo = ({ src, alt, name, onHover }: CompanyLogoProps) => {
  return (
    <div
      className="group relative flex aspect-square max-w-40 min-w-20 flex-1 items-center justify-center rounded border border-dotted border-gray-400 p-4"
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={src}
        alt={alt}
        className="h-10 w-full object-contain grayscale transition duration-300 group-hover:grayscale-0"
      />
      {[
        "top-0 left-0",
        "top-0 right-0",
        "bottom-0 left-0",
        "bottom-0 right-0",
      ].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} text-sm font-bold text-gray-500`}
        >
          +
        </span>
      ))}
    </div>
  );
};

export default CompanyLogo;
