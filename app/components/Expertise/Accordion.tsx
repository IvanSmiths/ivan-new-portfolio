"use client";

import React, { useRef, useState } from "react";
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

  const toggleAccordion = () => {
    if (accordionRef.current && contentRef.current) {
      const timeline = gsap.timeline();

      if (!isOpen) {
        timeline
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
      } else {
        timeline
          .to(contentRef.current, {
            height: 0,
            duration: 0.5,
          })
          .to(accordionRef.current, { width: "300px", duration: 0.5 }, "-=0.25")
          .to(accordionRef.current, { rotationZ: 7, duration: 0.5 }, "-=0.25");
      }
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
