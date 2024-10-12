import { FC } from "react";
import Link from "next/link";

export enum Label {
  All = "All",
  Photos = "Photos",
  Renders = "Renders",
}

enum Url {
  Crafts = "",
  Photos = "photos",
  Renders = "renders",
}

type FilterProps = {
  currentPage: Label;
};

const filters = [
  { page: Label.All, url: Url.Crafts },
  { page: Label.Photos, url: Url.Photos },
  { page: Label.Renders, url: Url.Renders },
];

const Filter: FC<FilterProps> = ({ currentPage }) => {
  return (
    <section className="fixed bottom-4 z-20 flex w-full flex-wrap items-center justify-center gap-small gap-y-2">
      {filters.map((filter, index: number) => (
        <Link
          data-cy={`link-${filter.url}`}
          key={index}
          href={`/crafts/${filter.url}`}
          className={`rounded-full p-3 py-1 font-bold text-primary ${
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
