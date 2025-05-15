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
    <section className="gap-small max-sm:right-small fixed bottom-4 z-20 flex w-full flex-wrap items-center justify-center gap-y-2 max-sm:bottom-24 max-sm:flex-col max-sm:items-end">
      {filters.map((filter: FilterOption, index: number) => (
        <Link
          key={index}
          href={`/crafts/${filter.url}`}
          className={`text-primary rounded-md p-3 py-1 font-bold ${
            currentPage === filter.page
              ? "bg-darker text-light"
              : "bg-dark text-light"
          }`}
        >
          {filter.page}
        </Link>
      ))}
    </section>
  );
};

export default Filter;
