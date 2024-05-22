import { FC } from "react";
import Link from "next/link";

export enum Pages {
  All = "all",
  Crafts = "",
  Photos = "photos",
  Renders = "renders",
}

type FilterProps = {
  currentPage: Pages;
};
const filters = [
  { page: Pages.All, url: Pages.Crafts },
  { page: Pages.Photos, url: Pages.Photos },
  { page: Pages.Renders, url: Pages.Renders },
];

const Filter: FC<FilterProps> = ({ currentPage }) => {
  return (
    <section className="fixed bottom-4 flex w-full items-center justify-center gap-small">
      {filters.map((filter, index: number) => (
        <Link
          key={index}
          href={`/crafts/${filter.url}`}
          className={`lato rounded-full p-4 py-3 font-bold text-primary ${
            currentPage === filter.page ? "bg-secondary" : "bg-secondaryLighter"
          }`}
        >
          {filter.page}
        </Link>
      ))}
    </section>
  );
};

export default Filter;
