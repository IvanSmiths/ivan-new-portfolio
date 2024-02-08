import React, { FC } from "react";
import City from "../HomePage/City";
import Time from "../HomePage/Time";
import Weather from "../HomePage/Weather";

const BottomText: FC = () => {
  return (
    <div className="grid fixed bottom-0 bg-secondary w-full h-[10%]">
      <div className="flex gap-medium items-center flex-wrap w-full grid-home-text-2">
        <City />
        <Time />
        <Weather />
      </div>
    </div>
  );
};

export default BottomText;
