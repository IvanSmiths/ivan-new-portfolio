import React, { FC, useEffect, useState } from 'react';

const WeatherPlaceholder: FC = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('api/weather')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            })
    }, [])
    if (!data) return

    const stringify = Math.round(data.main.temp).toString()
    let temperature = stringify.slice(0, -1);
    let weather = data.weather[0].main

    return (
        <span className="lowercase">{temperature}° {weather}</span>
    );
}
export default WeatherPlaceholder;