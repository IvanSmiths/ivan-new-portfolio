import React, { FC } from "react";
import City from "./City";
import Time from "./Time";
import FetchWeather from "./FetchWeather";

const BottomText: FC = () => {
  return (
    <div className="grid fixed bottom-0 bg-secondary w-full h-[10%] z-10">
      <div className="flex gap-medium items-center flex-wrap w-full grid-home-text-bottom">
        <City />
        <Time />
        <FetchWeather />
      </div>
    </div>
  );
};

export default BottomText;
