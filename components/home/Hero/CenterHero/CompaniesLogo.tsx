import { useRef } from "react";
import CompanyLogo from "./CompanyLogo";
import { logos } from "./logos";
import { useFadeInOnLoad } from "../../../../utils/hooks/animations/useFadeInOnLoad";

const CompaniesLogo = ({
  onHover,
}: {
  onHover: (company: string | null) => void;
}) => {
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const refsAsRefObjects = useRef(
    logos.map((_, i) => ({
      get current() {
        return logoRefs.current[i] || null;
      },
    })),
  );

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    logoRefs.current[index] = el;
  };

  useFadeInOnLoad({
    refs: refsAsRefObjects.current,
    options: {
      duration: 0.5,
      yOffset: 40,
      blurAmount: 8,
      stagger: 0.05,
    },
  });

  return (
    <div className="gap-md flex w-full flex-wrap justify-start">
      {logos.map(({ src, name, slug }, index) => (
        <div key={index} className="flex w-20 lg:flex-1" ref={setRef(index)}>
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
