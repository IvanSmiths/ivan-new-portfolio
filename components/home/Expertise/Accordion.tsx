"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { dm_mono } from "../../../utils/style/fonts/fonts";

interface AnimatedAccordionProps {
  title: string;
  content: string;
  rotation: number;
  left: number;
  top: number;
}

export default function AnimatedAccordion({
  title,
  content,
  top,
  left,
  rotation,
}: AnimatedAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accordionTimeline = useRef<GSAPTimeline | null>(null);

  useEffect((): void => {
    if (accordionRef.current && contentRef.current) {
      accordionTimeline.current = gsap.timeline({ paused: true });
      accordionTimeline.current
        .to(accordionRef.current, { rotationZ: 0, duration: 0.5 })
        .to(accordionRef.current, { width: "350px", duration: 0.5 }, "-=0.25")
        .to(contentRef.current, {
          height: "auto",
          duration: 0.5,
        });
    }
  }, []);

  const toggleAccordion = (): void => {
    if (!accordionTimeline.current) return;
    if (isOpen) {
      accordionTimeline.current.reverse();
    } else {
      accordionTimeline.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
        left: `${left}%`,
        top: `${top}%`,
      }}
      onClick={toggleAccordion}
      ref={accordionRef}
      className={`group border-foreground bg-background hover:border-background hover:bg-foreground absolute z-20 flex w-[130px] origin-top cursor-pointer flex-col border p-2 transition ${dm_mono.className}`}
    >
      <div className="flex origin-top items-center justify-between">
        <h3 className="group-hover:text-background text-xs uppercase transition">
          {title}
        </h3>
        <span className="group-hover:text-background transition">
          {isOpen ? "-" : "+"}
        </span>
      </div>
      <div className="h-0 overflow-hidden" ref={contentRef}>
        <p className="group-hover:text-background pt-sm transition">
          {content}
        </p>
      </div>
    </div>
  );
}
