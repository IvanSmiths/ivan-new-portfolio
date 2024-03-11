/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { FC, RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useAnimationStore } from "../../../utils/store";

interface WorkProps {
  setWorksRef: RefObject<HTMLDivElement>;
  title: string;
  img: string;
  link: string;
  role: string;
}

const Work: FC<WorkProps> = ({ setWorksRef, title, img, link, role }) => {
  const triggerRef = useRef<HTMLImageElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const workRef = useRef<HTMLHeadingElement>(null);

  const { fast } = useAnimationStore();

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(roleRef.current, {
      bottom: 1,
      duration: fast,
      ease: "circ.out",
    }).to(
      workRef.current,
      {
        bottom: 2,
        duration: fast,
        ease: "circ.out",
      },
      0.1,
    );

    function handleMouseEnter() {
      tl.play();
    }

    function handleMouseLeave() {
      tl.reverse();
    }

    const trigger = triggerRef.current;
    if (trigger) {
      trigger.addEventListener("mouseenter", handleMouseEnter);
      trigger.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        trigger.removeEventListener("mouseenter", handleMouseEnter);
        trigger.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [fast]);

  return (
    <li>
      <Link href={link}>
        <div
          ref={setWorksRef}
          className="h-[100vh] relative flex justify-center items-center flex-col gap-small"
        >
          <div className="absolute hidden md:block pointer-events-none top-[50%] w-full left-small text-left z-[1]">
            <div className="overflow-hidden relative h-10 pointer-events-none">
              <h2
                ref={roleRef}
                className="absolute text-white -bottom-5 left-0 lowercase"
              >
                {role}
              </h2>
            </div>
            <div className="overflow-hidden mt-1 relative h-10">
              <h3
                ref={workRef}
                className="absolute -bottom-9 left-0 heading-big font-bold text-white -mb-5 uppercase"
              >
                {title}
              </h3>
            </div>
          </div>
          <img
            ref={triggerRef}
            src={img}
            alt={title}
            className="w-[100%] grayscale-0 hover:grayscale-50 md:grayscale duration-500 rounded-lg h-[70%] object-cover"
          />
        </div>
      </Link>
    </li>
  );
};

export default Work;
