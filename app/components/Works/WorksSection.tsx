import { FC } from "react";
import { Works } from "../../../utils/graphql";
import WorkText from "./WorkText";

type WorksSectionProps = {
  works: Works[];
};

const WorksSection: FC<WorksSectionProps> = ({ works }) => {
  return (
    <section className="relative flex h-screen flex-col items-center justify-center px-small">
      <WorkText />
      <div className="flex h-full w-full flex-wrap gap-small">
        {works.map((work) => (
          <div className="relative h-2/6 w-full" key={work.id}>
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src={work.homeImage.url}
                height={work.homeImage.height}
                width={work.homeImage.width}
                alt={work.company}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
