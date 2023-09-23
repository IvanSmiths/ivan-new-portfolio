import { FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useAnimationStore } from "../../utils/store";

const Time: FC = () => {
    const [currentTime, setCurrentTime] = useState<string>("");
    const timeRef = useRef<HTMLSpanElement | null>(null);
    const timeScopeRef = useRef<HTMLDivElement | null>(null);
    const {durationMedium} = useAnimationStore();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const today = new Date();
            const time = today.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Europe/Rome'
            });
            setCurrentTime(time);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect((): void => {
        const scope = gsap.context(() => {
            gsap.timeline()
                .set(timeRef.current, {opacity: 0})
                .to(timeRef.current, {
                    opacity: 0,
                    top: 20,
                    duration: durationMedium,
                    ease: "circ.out"
                })
                .set(timeRef.current, {top: 0})
                .to(timeRef.current, {
                    opacity: 0,
                    top: -20,
                    duration: durationMedium,
                    ease: "circ.out"
                })
                .to(timeRef.current, {
                    opacity: 1,
                    top: 0,
                    duration: durationMedium,
                    ease: "circ.out"
                })
            return () => scope.revert();
        }, timeScopeRef)
    }, [currentTime, durationMedium]);

    return (
        <div ref={timeScopeRef} className="relative pr-medium pl-medium overflow-hidden">
            <span className="absolute ml-auto mr-auto top-0 left-0 right-0"
                  ref={timeRef}>{currentTime}</span>
        </div>
    )
};

export default Time;
