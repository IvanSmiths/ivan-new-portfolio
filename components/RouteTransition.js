import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";

function RouteTransition() {
    const router = useRouter()
    const [isChanging, setIsChanging] = useState(false);
    const transitionRef = useRef(null);

    useEffect(() => {
        const aniStart = () => {
            const tl = gsap.timeline();
            tl.to(transitionRef.current, {
                yPercent: 100,
                duration: 0.6,
            });
        };
        const aniEnd = () => {
            const tl = gsap.timeline();
            tl.to(transitionRef.current, {
                yPercent: 200,
                duration: 0.6,
                ease: "Expo.easeInOut",
            });
            tl.set(transitionRef.current, { yPercent: 0 });
        };

        const handler = () => {
            console.log("changing:", isChanging)
            setIsChanging(true);
            aniStart();
            setTimeout(() => {
                console.log("changing:", isChanging)
                aniEnd();
                setIsChanging(false);
            }, 600);
        };

        router.events.on('routeChangeComplete', handler);

        return () => {
            router.events.off('routeChangeComplete', handler);
        }
    }, [router.events])
    return (
        <>
            <div className="page-change-cnt">
                <div
                    ref={transitionRef}
                    id="cover"
                    className="cover-strip page-change-col"
                ></div>
            </div>
        </>
    )
}

export default RouteTransition