import { FC } from "react";
import Time from "./Time";
import Weather from "./Weather/Weather";
import { dm_mono } from "../../../../../utils/fonts/fonts";

const CityInfo: FC = () => {
  return (
    <div className="mt-sm gap-md flex">
      <span
        className={`text-foreground-muted ${dm_mono.className} text-xs uppercase`}
      >
        Wiesbaden(DE)
      </span>
      <Weather />
      <Time />
    </div>
  );
};

export default CityInfo;
