import { FC } from "react";
import Title from "./Title";
import CityInfo from "./CityInfo";

const Text: FC = () => {
  return (
    <div className="mt-auto grid">
      <Title />
      <CityInfo />
    </div>
  );
};

export default Text;
