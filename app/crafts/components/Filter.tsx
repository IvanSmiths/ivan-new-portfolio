import { FC } from "react";
import Link from "next/link";

export enum Pages {
  All = "all",
  Crafts = "",
  Photos = "photos",
  Renders = "renders",
}

type FilterProps = {
  page: [Pages.All, Pages.Photos, Pages.Renders];
};

const filters = [
  { page: Pages.All, url: Pages.Crafts },
  { page: Pages.Photos, url: Pages.Photos },
  { page: Pages.Renders, url: Pages.Renders },
];

const Filter: FC = () => {
  return (
    <div className="fixed bottom-0 flex gap-small">
      {filters.map((filter, index: number) => (
        <div key={index}>
          <Link href={`/crafts/${filter.url}`}>{filter.page}</Link>
        </div>
      ))}
    </div>
  );
};

export default Filter;
