import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./Weather/FetchWeather";

const CityInfo: FC = () => {
  return (
    <div className="md:col-start-[-1] md:col-end-[-6] col-start-1 col-end-6 sm:justify-end h-fit md:flex-row flex-row-reverse justify-end flex gap-3 sm:gap-small flex-wrap items-center">
      <Time />
      <FetchWeather />
      <span className="mono">Wiesbaden (DE)</span>
    </div>
  );
};

export default CityInfo;
