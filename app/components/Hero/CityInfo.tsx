import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./Weather/FetchWeather";

const CityInfo: FC = () => {
  return (
    <div className="col-span-full flex h-fit flex-wrap items-center gap-3 sm:gap-small md:mb-small">
      <Time />
      <span className="lato">Wiesbaden (DE)</span>
      <FetchWeather />
    </div>
  );
};

export default CityInfo;
