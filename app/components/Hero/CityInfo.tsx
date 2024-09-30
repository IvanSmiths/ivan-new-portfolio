import { FC } from "react";
import Time from "./Time";

const CityInfo: FC = () => {
  return (
    <div className="col-span-full flex h-fit flex-wrap items-center gap-3 sm:gap-small md:mb-small">
      <Time />
      <span className="lato">Wiesbaden (DE)</span>
    </div>
  );
};

export default CityInfo;
