import Weather from "./Weather";
import { getWeather } from "../../../../../utils/fetch/getWeather";

type WeatherData = {
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
};

async function FetchWeather() {
  const data: WeatherData | null = await getWeather();

  if (!data) {
    return null;
  }

  const weatherData = data as WeatherData;
  const { weather } = weatherData;
  const { temp } = weatherData.main;

  return <Weather temp={temp} weather={weather[0].main} />;
}

export default FetchWeather;
