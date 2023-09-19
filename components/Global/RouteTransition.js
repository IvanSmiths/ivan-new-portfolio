import {useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {gsap} from "gsap";

function RouteTransition({children}) {
    const router = useRouter()
    const transitionRef = useRef(null);

    useEffect(() => {
        console.log("UseEffect run")
        const transition = () => {
            console.log("Transition function ran")
            const tl = gsap.timeline();
            tl.to(transitionRef.current, {
                opacity: 0,
                duration: 0.2,
            });
            tl.to(transitionRef.current, {
                opacity: 1,
                duration: 0.2,
            });
            tl.play()
        };
        router.events.on('routeChangeStart', transition);
        return () => {
            console.log("UseEffect return")
            router.events.off("routeChangeStart", transition);
        }
    }, [router.events])
    return (
        <div ref={transitionRef}>
            {children}
        </div>
    )
}

export default RouteTransition