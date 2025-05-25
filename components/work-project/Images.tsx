import { WorkProjectPage } from "../../utils/pages/types";

type HeaderProps = {
  work: WorkProjectPage;
};

const Images = ({ work }: HeaderProps) => {
  return (
    <div className="pt-sm w-full">
      <ul className="gap-sm flex w-full flex-col">
        {work.images.map((image, index) => (
          <li key={index} className="w-full">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              alt={`work number ${index}`}
              className="h-full"
              src={image}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Images;
