"use client";

import { FC, useRef, useState } from "react";
import Navbar from "../globalComponents/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const NavbarWrapper: FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);
  const handleEnter = () => {
    setIsFixed(true);
  };

  const handleLeave = () => {
    setIsFixed(false);
  };

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "max",
        onEnter: handleEnter,
        onLeaveBack: handleLeave,
      });
    },
    { scope: triggerRef },
  );
  return (
    <div
      className={`${isFixed ? "fixed sm:top-0 left-0 w-full z-10" : "sticky"} pt-3`}
      ref={triggerRef}
    >
      <Navbar />
    </div>
  );
};

export default NavbarWrapper;
