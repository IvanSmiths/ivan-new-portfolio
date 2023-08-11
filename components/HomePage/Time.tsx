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

    useEffect(() => {
        gsap.set(timeRef.current, {opacity: 0})
        gsap.timeline().to(timeRef.current, {
            opacity: 0,
            duration: 0.4
        }).to(timeRef.current, {
            opacity: 1,
            duration: 0.4
        })
    }, [currentTime]);

    return <span ref={timeRef}>{currentTime}</span>;
};

export default Time;
