import { WorkProjectBase } from "../../utils/pages/types";

interface WorkNavigationProps {
  works: WorkProjectBase[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const TemplateNavigation = ({
  works,
  currentIndex,
  onNavigate,
}: WorkNavigationProps) => {
  return (
    <div className="md:bottom-sm absolute bottom-[100px] left-1/2 z-20 -translate-x-1/2">
      <div className="gap-md flex">
        {works.map((work: WorkProjectBase, index: number) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`relative h-12 w-16 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-110 ${
              index === currentIndex
                ? "ring-foreground scale-110 ring-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              className="h-full w-full object-cover"
              src={work.homeImage.url}
              alt={`Navigate to ${work.name}`}
              width={64}
              height={48}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateNavigation;
