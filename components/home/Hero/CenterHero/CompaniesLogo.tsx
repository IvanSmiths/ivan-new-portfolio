import CompanyLogo from "./CompanyLogo";
import { logos } from "./logos";

const CompaniesLogo = ({
  onHover,
}: {
  onHover: (company: string | null) => void;
}) => {
  return (
    <div className="gap-md flex w-full flex-wrap justify-start">
      {logos.map(({ src, name, slug }, index) => (
        <CompanyLogo
          src={`/logo/${src}`}
          alt={name}
          key={index}
          index={index}
          name={name}
          href={`/works/${slug}`}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default CompaniesLogo;
