"use client";

import { dm_mono } from "../../../utils/style/fonts/fonts";
import { WorkProjectBase } from "../../../utils/data/types";
import Link from "next/link";
import { useWorkItemAnimations } from "../../../utils/hooks/animations/useWorkAnimationItem";
import { WorkItem } from "./WorkItem";

export type WorksProps = {
  works: WorkProjectBase[];
};

export default function Works({ works }: WorksProps) {
  const { handleLinkRef, handleMarqueeRef } = useWorkItemAnimations(works);

  return (
    <section className="px-sm py-4xl w-full">
      <h2
        className={`text-foreground ${dm_mono.className} pb-sm text-xs uppercase underline underline-offset-2`}
      >
        <Link href="/works">All the works</Link>
      </h2>
      {works.map((work, index) => (
        <WorkItem
          key={index}
          work={work}
          index={index}
          onLinkRefAction={handleLinkRef}
          onMarqueeRefAction={handleMarqueeRef}
        />
      ))}
    </section>
  );
}
