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
  try {
    const res: Response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Wiesbaden&appid=${process.env.OPEN_WEATHER_API}&units=metric`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Weather API failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
}

async function FetchWeather() {
  const data: WeatherData | null = await getData();

  if (!data) {
    return null;
  }

  const weatherData = data as WeatherData;
  const { weather } = weatherData;
  const { temp } = weatherData.main;

  return <Weather temp={temp} weather={weather[0].main} />;
}

export default FetchWeather;
