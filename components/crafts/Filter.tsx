import Link from "next/link";
import { FC } from "react";

export enum Label {
  All = "All",
  Photos = "Photos",
  Renders = "Renders",
}

enum Url {
  All = "",
  Photos = "photos",
  Renders = "renders",
}

type FilterProps = {
  currentPage: Label;
};

type FilterOption = {
  page: Label;
  url: Url;
};

const filters: FilterOption[] = [
  { page: Label.All, url: Url.All },
  { page: Label.Photos, url: Url.Photos },
  { page: Label.Renders, url: Url.Renders },
];

const Filter: FC<FilterProps> = ({ currentPage }) => {
  return (
    <section className="fixed bottom-4 z-20 flex w-full flex-wrap items-center justify-center gap-small gap-y-2 max-sm:bottom-24 max-sm:right-small max-sm:flex-col max-sm:items-end">
      {filters.map((filter: FilterOption, index: number) => (
        <Link
          key={index}
          href={`/crafts/${filter.url}`}
          className={`text-primary rounded-md p-3 py-1 font-bold ${
            currentPage === filter.page
              ? "bg-darker text-light dark:bg-lighter dark:text-dark"
              : "bg-dark text-light dark:bg-light dark:text-dark"
          }`}
        >
          {filter.page}
        </Link>
      ))}
    </section>
  );
};

export default Filter;
