import React from "react";
import Weather from "./Weather";

async function getData() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Wiesbaden&appid=${process.env.OPEN_WEATHER_API}&units=metric`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function FetchWeather() {
  const data = await getData();
  console.log(data);
  return (
    <>
      <Weather data={data} />
    </>
  );
}
export default FetchWeather;
