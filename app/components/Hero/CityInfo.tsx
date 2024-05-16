import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./Weather/FetchWeather";

const CityInfo: FC = () => {
  return (
    <div className="col-start-1 col-end-6 mb-0 flex h-fit flex-row-reverse flex-wrap items-center justify-end gap-3 sm:justify-end sm:gap-small md:col-start-[-1] md:col-end-[-6] md:mb-small md:flex-row">
      <Time />
      <FetchWeather />
      <span className="lato">Wiesbaden (DE)</span>
    </div>
  );
};

export default CityInfo;
