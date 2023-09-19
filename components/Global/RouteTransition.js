import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {gsap} from "gsap";

function RouteTransition({children}) {
    const router = useRouter();
    const transitionRef = useRef(null);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        const handleRouteChange = () => {
            const tl = gsap.timeline();
            tl.to(transitionRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    setDisplayChildren(children);
                    gsap.to(transitionRef.current, {
                        opacity: 1,
                        duration: 0.3,
                    });
                },
            });
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events, children]);

    return <div ref={transitionRef}>{displayChildren}</div>;
}

export default RouteTransition;
