import { FC } from "react";
import CityInfo from "./CityInfo";

const Text: FC = () => {
  return (
    <div className="mt-auto w-full">
      <h1 className="font-semibold">
        Fullstack Developer with 3 years of experience. Seeking the limit.
      </h1>
      <CityInfo />
    </div>
  );
};

export default Text;
