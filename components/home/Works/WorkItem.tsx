"use client";

import Link from "next/link";
import { dm_mono } from "../../../utils/style/fonts/fonts";
import { WorkProjectBase } from "../../../utils/data/types";
import { Marquee, MarqueeHandle } from "./Marquee";

interface WorkItemProps {
  work: WorkProjectBase;
  index: number;
  onLinkRefAction: (index: number, el: HTMLAnchorElement | null) => void;
  onMarqueeRefAction: (index: number, el: MarqueeHandle | null) => void;
}

export function WorkItem({
  work,
  index,
  onLinkRefAction,
  onMarqueeRefAction,
}: WorkItemProps) {
  return (
    <Link
      href={`/works/${work.slug}`}
      ref={(el) => onLinkRefAction(index, el)}
      className={`group border-background-muted hover:bg-foreground relative flex cursor-pointer items-start justify-center overflow-hidden border-b py-10 text-center transition ${
        index === 0 ? "border-t" : ""
      }`}
    >
      <span
        className={`text-foreground-muted z-10 pt-1 text-xs uppercase group-hover:opacity-0 md:pt-4 ${dm_mono.className}`}
      >
        (0{index + 1})
      </span>

      <h3 className="relative inline-block text-5xl font-black uppercase group-hover:opacity-0 md:text-6xl lg:text-9xl">
        {work.name}
      </h3>

      <Marquee ref={(el) => onMarqueeRefAction(index, el)}>
        <span className="text-background mr-8 text-5xl uppercase md:text-6xl lg:text-9xl">
          {work.name}
        </span>
      </Marquee>
    </Link>
  );
}
