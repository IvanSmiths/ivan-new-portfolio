import { FC } from "react";
import Title from "./Title";
import CityInfo from "./CityInfo";

const Text: FC = () => {
  return (
    <div className="ml-small">
      <CityInfo />
      <Title />
    </div>
  );
};

export default Text;
