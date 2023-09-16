import {useEffect, useRef} from "react";
import {useRouter} from "next/router";
import {gsap} from "gsap";
import {useAnimationStore} from "../../utils/store";

function RouteTransition({children}) {
    const router = useRouter()

    const scope = useRef();
    const transitionRef = useRef(null);

    const {duration} = useAnimationStore();

    useEffect(() => {
        let ctx = gsap.context(() => {
            const aniStart = () => {
                const tl = gsap.timeline();
                tl.to(transitionRef.current, {
                    opacity: 0,
                    duration: duration,
                });
            };

            const aniEnd = () => {
                const tl = gsap.timeline();
                tl.to(transitionRef.current, {
                    opacity: 1,
                    duration: duration,
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
            return () => router.events.off('routeChangeComplete', handler);
        }, scope);
        return () => ctx.revert();
    }, [duration, router.events])

    return (
        <>
            <div ref={scope}>
                <div ref={transitionRef}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default RouteTransition