"use client";

import { dm_mono } from "../../../utils/fonts";
import { WorkProjectBase } from "../../../utils/pages/types";

export type WorksProps = {
  works: WorkProjectBase[];
};

export default function Works({ works }: WorksProps) {
  return (
    <div className="px-sm py-3xl w-full">
      {works.map((work, index) => {
        return (
          <div
            key={index}
            className={`group border-background-muted hover:bg-foreground flex cursor-pointer items-start justify-center border-b py-10 text-center transition ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <span
              className={`text-foreground-muted pt-3 text-xs uppercase ${dm_mono.className}`}
            >
              (0{index + 1})
            </span>
            <h3 className="group-hover:text-background text-9xl uppercase transition">
              {work.name.replace("Creative Studio", "").trim()}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
