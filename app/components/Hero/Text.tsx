import { FC } from "react";
import Title from "./Title";
import CityInfo from "./CityInfo";

const Text: FC = () => {
  return (
    <div className="mb-small ml-small mt-auto">
      <CityInfo />
      <Title />
    </div>
  );
};

export default Text;
