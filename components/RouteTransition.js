import { useEffect } from "react";
import { useRouter } from "next/router";

function RouteTransition() {
    const router = useRouter();

    useEffect(() => {
        const handler = () => {
            console.log("start")
            setTimeout(() => {
                console.log("exit")
            }, 980);
        };

        router.events.on('routeChangeComplete', handler);

        return () => {
            router.events.off('routeChangeComplete', handler);
        }
    }, [router.events])

    return (
        <></>
    )
}

export default RouteTransition