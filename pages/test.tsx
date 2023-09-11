import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap"

const Test: FC = () => {
    const router = useRouter();

    const [complete, setComplete] = useState(false);
    const [play, setPlay] = useState(false);
    const transitionRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const tl = gsap.timeline()
        if (play === true) {
            tl.to(transitionRef.current, {
                opacity: 0,
                duration: 0.4
            })
            tl.then(
                function () {
                    setComplete(true);
                },
            )
        }
        return () => {
        };
    }, [play]);

    useEffect(() => {
        if (complete === true) {
            router.push("/");
        }
        return () => {
            setComplete(false);
        };
    }, [router, complete,]);
    return (
        <div ref={transitionRef}>
            <h1 onClick={() => setPlay(true)}>Click me</h1>
        </div>
    )
}

export default Test