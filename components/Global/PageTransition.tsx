import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PageTransition = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const transitionRef = useRef(null);
    const queryRef = useRef(null);
    useEffect(() => {
        const aniStart = async () => {
            setIsActive(true);
            const tl = gsap.timeline();
            tl.to(transitionRef.current, {
                yPercent: 100,
                duration: 0.7,
                ease: "expo.inOut"
            });
            tl.to(queryRef.current,
                {
                    opacity: 0,
                    duration: 0.4,
                    ease: "circ.out"
                })
            tl.to(queryRef.current,
                {
                    opacity: 1,
                    duration: 0.4,
                    ease: "circ.out"
                })
        };
        const aniEnd = () => {
            const tl = gsap.timeline();
            if (isActive) {
                tl.to(transitionRef.current, {
                    yPercent: 0,
                    duration: 1.3,
                    ease: "expo.inOut"
                });
                setIsActive(false);
            }
            tl.set(transitionRef.current, {yPercent: 0});
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

    const path = router.asPath;
    const cleanPath = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/-/g, ' ');

    return (
        <>
            <div className="z-[99999950] overflow-hidden flex flex-col relative">
                <div
                    ref={transitionRef}
                    className="h-screen w-full top-0 fixed -translate-y-full bg-primary"
                >
                    <span ref={queryRef}
                          className="text-secondary fixed right-2 heading-big font-bold bottom-20">{cleanPath}</span>
                </div>
            </div>
        </>
    );
};
export default PageTransition;