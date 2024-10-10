import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./Weather/FetchWeather";

const CityInfo: FC = () => {
  return (
    <div className="col-span-full ml-small mt-small flex h-fit flex-wrap items-center gap-x-4 pb-small md:mb-small md:gap-x-10 md:pb-0">
      <span className="text-md sm:text-xl">Wiesbaden (DE)</span>
      <FetchWeather />
      <Time />
    </div>
  );
};

export default CityInfo;
