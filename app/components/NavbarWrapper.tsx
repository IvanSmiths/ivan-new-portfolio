"use client";

import { FC, useRef } from "react";
import Navbar from "../globalComponents/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const NavbarWrapper: FC = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "max",
        pin: true,
      });
    },
    { scope: triggerRef },
  );
  return (
    <div className="z-20 pt-2" ref={triggerRef}>
      <Navbar />
    </div>
  );
};

export default NavbarWrapper;
