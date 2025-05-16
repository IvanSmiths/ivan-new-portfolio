import CompanyLogo from "./CompanyLogo";

const logoFiles = [
  "Scholz-&-Volkmer.png",
  "Adidas.svg",
  "Commerzbank.svg",
  "Deutsche-Bahn.png",
  "TD.svg",
  "Ideology.png",
  "Lemon-Soda.png",
  "Neu-Gelb.svg",
  "R+V.png",
  "UMB.svg",
  "WMF.svg",
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
