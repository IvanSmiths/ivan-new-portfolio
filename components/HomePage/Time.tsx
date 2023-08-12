import {FC, useEffect, useRef, useState} from "react";
import {gsap} from "gsap";

const Time: FC = () => {
    const [currentTime, setCurrentTime] = useState<string>("");
    const timeRef = useRef<HTMLSpanElement | null>(null);

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
        gsap.timeline()
            .to(timeRef.current, {
                opacity: 0,
                top: 20,
                duration: 0.3
            })
            .set(timeRef.current, {top: 0})
            .to(timeRef.current, {
                opacity: 0,
                top: -20,
                duration: 0.3
            })
            .to(timeRef.current, {
                opacity: 1,
                top: 0,
                duration: 0.3
            })

    }, [currentTime]);

    return (
        <div className="relative pr-medium pl-medium overflow-hidden">
            <span className="paragraph-light absolute ml-auto mr-auto top-0 left-0 right-0"
                  ref={timeRef}>{currentTime}</span>
        </div>
    )
};

export default Time;
