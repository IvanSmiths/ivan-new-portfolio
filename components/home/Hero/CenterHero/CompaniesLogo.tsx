import CompanyLogo from "./CompanyLogo";
import { logos } from "./logos";

const CompaniesLogo = ({
  onHover,
}: {
  onHover: (company: string | null) => void;
}) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {logos.map(({ src, name, slug }, index) => (
        <CompanyLogo
          key={index}
          src={`/logo/${src}`}
          alt={name}
          name={name}
          href={`/works/${slug}`}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default CompaniesLogo;
