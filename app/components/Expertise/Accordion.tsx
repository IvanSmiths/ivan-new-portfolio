"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

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
        .to(accordionRef.current, { width: "400px", duration: 0.5 }, "-=0.25")
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
      className="group absolute flex w-[200px] origin-top cursor-pointer flex-col rounded-lg border border-dark bg-light p-4 shadow-lg transition hover:border-light hover:bg-dark dark:border-light dark:bg-dark dark:hover:border-dark dark:hover:bg-light"
    >
      <div className="flex origin-top items-center justify-between">
        <h2 className="text-xl font-bold transition group-hover:text-light dark:group-hover:text-dark">
          {title}
        </h2>
        <span className="text-2xl transition group-hover:text-light dark:group-hover:text-dark">
          {isOpen ? "-" : "+"}
        </span>
      </div>
      <div className="h-0 overflow-hidden" ref={contentRef}>
        <p className="transition group-hover:text-light dark:group-hover:text-dark">
          {content}
        </p>
      </div>
    </div>
  );
}
