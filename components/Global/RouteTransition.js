import {useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {gsap} from "gsap";

function RouteTransition({children}) {
    const router = useRouter()
    const transitionRef = useRef(null);

    useEffect(() => {
        const aniStart = () => {
            const tl = gsap.timeline();
            tl.to(transitionRef.current, {
                opacity: 0,
                duration: 0.2,
            });
        };

        const aniEnd = () => {
            const tl = gsap.timeline();
            tl.to(transitionRef.current, {
                opacity: 1,
                duration: 0.2,
            });
        };

        const handler = () => {
            aniStart();
            console.log('aniStart')
            setTimeout(() => {
                aniEnd();
                console.log('aniEnd')
            }, 400);
        };

        router.events.on('routeChangeStart', handler);

        return () => {
            router.events.off('routeChangeComplete', handler);
        }
    }, [router.events])
    return (
        <>
            <div ref={transitionRef}>
                {children}
            </div>
        </>
    )
}

export default RouteTransition