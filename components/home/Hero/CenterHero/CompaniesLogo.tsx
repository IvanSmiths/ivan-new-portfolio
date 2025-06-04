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
        <div
          key={index}
          className="animate-fadeInUp flex w-20 opacity-0 lg:flex-1"
          style={{
            animationDelay: `${index * 80}ms`,
          }}
        >
          <CompanyLogo
            src={`/logo/${src}`}
            alt={name}
            name={name}
            href={`/works/${slug}`}
            onHover={onHover}
          />
        </div>
      ))}
    </div>
  );
};

export default CompaniesLogo;
