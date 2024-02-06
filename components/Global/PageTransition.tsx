import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PageTransition: FC = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  const transitionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const aniStart: () => void = async () => {
      setIsActive(true);
      const tl = gsap.timeline();
      tl.to(transitionRef.current, {
        yPercent: 100,
        display: "block",
        duration: 0.6,
        ease: "expo.inOut",
      });
    };
    const aniEnd: () => void = async () => {
      const tl = gsap.timeline();
      if (isActive) {
        tl.to(transitionRef.current, {
          yPercent: 0,
          duration: 1.5,
          ease: "expo.inOut",
        });
        setIsActive(false);
      }
      tl.set(transitionRef.current, { yPercent: 0, display: "none" });
    };

    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
    };
  }, [router.events, isActive]);

  return (
    <>
      <div className="z-20 overflow-hidden flex flex-col relative">
        <div
          ref={transitionRef}
          className="h-screen w-full top-0 fixed -translate-y-full bg-primary"
        ></div>
      </div>
    </>
  );
};
export default PageTransition;
