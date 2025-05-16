import CompanyLogo from "./CompanyLogo";
import { logos } from "./logos";

const CompaniesLogo = ({
  onHover,
}: {
  onHover: (company: string | null) => void;
}) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {logos.map(({ src, alt, name, slug }, index) => (
        <CompanyLogo
          key={index}
          src={`/logo/${src}`}
          alt={alt}
          name={name}
          href={`/work/${slug}`}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default CompaniesLogo;
