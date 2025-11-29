import Link from "next/link";
import { FC } from "react";
import { dm_mono } from "../../utils/style/fonts/fonts";

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
    <section className="gap-sm max-sm:right-small fixed bottom-4 z-20 flex w-full flex-wrap items-center justify-center gap-y-2 max-sm:bottom-24 max-sm:flex-col max-sm:items-end">
      {filters.map((filter: FilterOption, index: number) => (
        <Link
          key={index}
          href={`/crafts/${filter.url}`}
          className={`${dm_mono} p-3 py-1 text-sm uppercase ${
            currentPage === filter.page
              ? "bg-background text-foreground ring-foreground-muted ring-1"
              : "bg-background-muted text-foreground-muted"
          }`}
        >
          {filter.page}
        </Link>
      ))}
    </section>
  );
};

export default Filter;
