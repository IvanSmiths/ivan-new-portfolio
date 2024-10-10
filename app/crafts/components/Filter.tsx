import { FC } from "react";
import Link from "next/link";

export enum Pages {
  All = "All",
  Crafts = "",
  Photos = "Photos",
  Renders = "Renders",
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
    <section className="fixed bottom-4 z-20 flex w-full flex-wrap items-center justify-center gap-small gap-y-2">
      {filters.map((filter, index: number) => (
        <Link
          data-cy={`link-${filter.page}`}
          key={index}
          href={`/crafts/${filter.url}`}
          className={`rounded-full p-4 py-3 font-bold text-primary ${
            currentPage === filter.page
              ? "bg-lighter dark:bg-darker"
              : "bg-light dark:bg-dark"
          }`}
        >
          {filter.page}
        </Link>
      ))}
    </section>
  );
};

export default Filter;
