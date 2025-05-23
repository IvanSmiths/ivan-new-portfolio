"use client";

import { dm_mono } from "../../../utils/fonts";
import { WorkProjectBase } from "../../../utils/pages/types";
import Link from "next/link";

export type WorksProps = {
  works: WorkProjectBase[];
};

export default function Works({ works }: WorksProps) {
  return (
    <section className="px-sm py-4xl w-full">
      <h2
        className={`text-foreground-muted ${dm_mono.className} pb-md text-xs uppercase`}
      >
        Featured works
      </h2>
      {works.map((work, index) => {
        return (
          <Link
            href={`/works/${work.slug}`}
            key={index}
            className={`group border-background-muted hover:bg-foreground flex cursor-pointer items-start justify-center border-b py-10 text-center transition ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <span
              className={`text-foreground-muted pt-1 text-xs uppercase md:pt-4 ${dm_mono.className}`}
            >
              (0{index + 1})
            </span>
            <h3 className="group-hover:text-background relative inline-block text-4xl uppercase transition md:text-6xl lg:text-9xl">
              {work.name}
            </h3>
          </Link>
        );
      })}
    </section>
  );
}
