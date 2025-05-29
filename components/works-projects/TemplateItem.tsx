import { FC } from "react";
import Link from "next/link";
import { WorkProjectBase } from "../../utils/data/types";

interface WorkItemProps {
  work: WorkProjectBase;
  path: string;
}

const TemplateItem: FC<WorkItemProps> = ({ work, path }) => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="relative w-9/12 md:w-[400px] lg:w-96">
        <Link href={(path + "/" + work.slug).toString()}>
          <div className="bg-background/30 dark:bg-background/20 absolute top-0 left-0 h-full w-full"></div>
          <img
            className="h-full w-full object-cover"
            src={work.homeImage.url}
            alt={work.name}
            width={work.homeImage.width}
            height={work.homeImage.height}
          />
        </Link>
      </div>
    </div>
  );
};

export default TemplateItem;
