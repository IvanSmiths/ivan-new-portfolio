import CompanyLogo from "./CompanyLogo";

const logoFiles = [
  "171024_SEO_ml.png",
  "Adidas_Logo.svg",
  "Commerzbank-Logo 1.svg",
  "Deutsche_Bahn_AG-Logo.svg.png",
  "Frame 630.svg",
  "images.png",
  "logo.png",
  "neu.svg",
  "RuV_Logo_Blau 1.png",
  "svgviewer-output.svg",
  "WMF-Logo.svg",
];

const fileNameToName = (file: string) =>
  file
    .replace(/\.(png|svg|jpg|jpeg|webp)/i, "")
    .replace(/[_\-]/g, " ")
    .replace(/\d+/g, "")
    .trim();

const CompaniesLogo = ({
  onHover,
}: {
  onHover: (company: string | null) => void;
}) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {logoFiles.map((file, index) => (
        <CompanyLogo
          key={index}
          src={`/logo/${file}`}
          alt={file}
          name={fileNameToName(file)}
          onHover={onHover}
        />
      ))}
    </div>
  );
};

export default CompaniesLogo;
