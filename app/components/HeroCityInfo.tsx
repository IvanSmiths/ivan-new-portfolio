import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./FetchWeather";

const HeroCityInfo: FC = () => {
  return (
    <div className="font-bold col-start-8 col-end-13 h-fit justify-items-end flex gap-3 sm:gap-small flex-wrap items-center w-full">
      <span className="text-primary-light">Wiesbaden (DE)</span>
      <Time />
      <FetchWeather />
    </div>
  );
};

export default HeroCityInfo;
