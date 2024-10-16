"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimatedAccordionProps {
  title: string;
  content: string;
  rotation: number;
  left: number;
  top: number;
  openDirection: "up" | "down";
}

export default function AnimatedAccordion({
  title,
  content,
  top,
  left,
  rotation,
  openDirection = "down",
}: AnimatedAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const accordionTimeline = useRef<GSAPTimeline | null>(null); // useRef for the timeline

  useEffect(() => {
    if (accordionRef.current && contentRef.current) {
      accordionTimeline.current = gsap.timeline({ paused: true });
      accordionTimeline.current
        .to(accordionRef.current, { rotationZ: 0, duration: 0.5 })
        .to(accordionRef.current, { width: "400px", duration: 0.5 }, "-=0.25")
        .to(
          contentRef.current,
          {
            height: "auto",
            duration: 0.5,
          },
          "-=0.25",
        );
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
        left: `${left}px`,
        top: `${top}px`,
      }}
      ref={accordionRef}
      className={`${openDirection === "up" ? "flex-col-reverse" : "flex-col"} absolute flex w-[200px] rounded-lg bg-gray-800 p-4 text-white shadow-lg`}
    >
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={toggleAccordion}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-2xl">{isOpen ? "-" : "+"}</span>
      </div>
      <div className="h-0 overflow-hidden" ref={contentRef}>
        <p>{content}</p>
      </div>
    </div>
  );
}
