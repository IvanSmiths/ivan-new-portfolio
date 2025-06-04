import { WorkProjectPage } from "../../utils/data/types";

type HeaderProps = {
  work: WorkProjectPage;
};

const Images = ({ work }: HeaderProps) => {
  return (
    <div className="pt-sm w-full">
      <ul className="gap-sm flex w-full flex-col">
        {work.images.map((image, index) => (
          <li key={index} className="w-full">
            <img
              alt={`work number ${index}`}
              className="animate-fadeInUp h-full opacity-0"
              src={image}
              loading="lazy"
              style={{
                animationDelay: `${index * 800}ms`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Images;
