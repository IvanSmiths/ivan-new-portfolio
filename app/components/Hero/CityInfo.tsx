import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./Weather/FetchWeather";

const CityInfo: FC = () => {
  return (
    <div className="flex h-fit flex-wrap items-center gap-3 sm:gap-small md:mb-small">
      <Time />
      <FetchWeather />
      <span className="lato">Wiesbaden (DE)</span>
    </div>
  );
};

export default CityInfo;
