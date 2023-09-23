import React, { FC, useEffect, useRef, useState } from 'react';
import { useAnimationStore } from "../../utils/store";
import { gsap } from "gsap";

const WeatherPlaceholder: FC = () => {
    const [data, setData] = useState(null)
    const scopeRef = useRef<HTMLDivElement | null>(null);
    const weatherRef = useRef<HTMLSpanElement | null>(null);
    const {durationMedium} = useAnimationStore();

    useEffect(() => {
        fetch('api/weather')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])

    useEffect((): void => {
        if (data) {
            const scope = gsap.context(() => {
                gsap.timeline()
                    .set(weatherRef.current, {opacity: 0})
                    .to(weatherRef.current, {
                        opacity: 0,
                        top: 20,
                        duration: durationMedium,
                        ease: "circ.out"
                    })
                    .set(weatherRef.current, {top: 0})
                    .to(weatherRef.current, {
                        opacity: 0,
                        top: -20,
                        duration: durationMedium,
                        ease: "circ.out"
                    })
                    .to(weatherRef.current, {
                        opacity: 1,
                        top: 0,
                        duration: durationMedium,
                        ease: "circ.out"
                    })
                return () => scope.revert();
            }, scopeRef)
        }
    }, [durationMedium, data]);

    if (!data) return

    const stringify = Math.round(data.main.temp).toString()
    let temperature = stringify.slice(0, -1);
    let weather = data.weather[0].main

    return (
        <div ref={scopeRef} className="relative pr-medium pl-medium overflow-hidden">
            <span ref={weatherRef} className="lowercase absolute ml-auto mr-auto top-0 left-0 right-0">
                    {temperature}° {weather}
            </span>
        </div>
    );
}
export default WeatherPlaceholder;