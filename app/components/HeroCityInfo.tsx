import { FC } from "react";
import Time from "./Time";
import FetchWeather from "./FetchWeather";

const HeroCityInfo: FC = () => {
  return (
    <div className="font-bold col-start-[-1] col-end-[-5] justify-end h-fit justify-items-end flex gap-3 sm:gap-small flex-wrap items-center">
      <Time />
      <FetchWeather />
      <span className="mono">Wiesbaden (DE)</span>
    </div>
  );
};

export default HeroCityInfo;
