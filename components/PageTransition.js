import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

const PageTransition = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let timer;
    const aniStart = async () => {
      timer = setTimeout(() => {
        setIsActive(true);
        const tl = gsap.timeline();
        tl.to(".cover-strip", {
          yPercent: 100,
          duration: 0.6,
          ease: "Expo.easeInOut",
          stagger: 0.1,
        });
      }, 10);
    };
    const aniEnd = () => {
      console.log(isActive);
      if (timer) {
        clearTimeout(timer);
      }
      const tl = gsap.timeline();
      if (isActive) {
        tl.to(".cover-strip", {
          yPercent: 200,
          duration: 0.4,
          ease: "Expo.easeInOut",
          stagger: -0.1,
        });
        setIsActive(false);
      }

      tl.set(".cover-strip", { yPercent: 0 });
      clearTimeout(timer);
    };

    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router]);
  return (
    <>
      <div className="page-change-cnt">
        <div
          id="cover"
          className="cover-strip page-change-col page-change-col-1"
        ></div>
        <div
          id="cover1"
          className="cover-strip page-change-col page-change-col-2"
        ></div>
        <div
          id="cover2"
          className="cover-strip page-change-col page-change-col-3"
        ></div>
        <div
          id="cover3"
          className="cover-strip page-change-col page-change-col-4"
        ></div>
      </div>
    </>
  );
};
export default PageTransition;
