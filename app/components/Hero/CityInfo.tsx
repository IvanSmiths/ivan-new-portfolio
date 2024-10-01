import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./Weather/FetchWeather";

const CityInfo: FC = () => {
  return (
    <div className="col-span-full ml-small mt-small flex h-fit flex-wrap items-center gap-10 md:mb-small">
      <span className="lato text-md sm:text-xl">Wiesbaden (DE)</span>
      <FetchWeather />
      <Time />
    </div>
  );
};

export default CityInfo;
