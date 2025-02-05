import Weather from "./Weather";

type WeatherData = {
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
};

async function getData() {
  const res: Response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Wiesbaden&appid=${process.env.OPEN_WEATHER_API}&units=metric`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function FetchWeather() {
  const data: WeatherData = await getData();
  const { weather } = data;
  const { temp } = data.main;

  return <Weather temp={temp} weather={weather[0].main} />;
}
export default FetchWeather;
