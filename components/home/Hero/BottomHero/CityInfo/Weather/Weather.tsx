import { getWeather } from "../../../../../../utils/fetch/getWeather";
import { dm_mono } from "../../../../../../utils/fonts";
import React from "react";

type WeatherData = {
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
};

async function Weather() {
  const data: WeatherData | null = await getWeather();

  if (!data) {
    return null;
  }

  const weatherData = data as WeatherData;
  const { weather } = weatherData;
  const { temp } = weatherData.main;
  const temperature = Math.round(temp);
  const weatherDeg = weather[0].main;

  return (
    <div className="flex">
      <span
        className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
      >
        {temperature}°
      </span>
      <span
        className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
      >
        {weatherDeg}
      </span>
    </div>
  );
}

export default Weather;
