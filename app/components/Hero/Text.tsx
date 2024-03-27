import { FC } from "react";
import Title from "./Title";
import CityInfo from "./CityInfo";

const Text: FC = () => {
  return (
    <div className="mt-auto mb-small grid items-end">
      <Title />
      <CityInfo />
    </div>
  );
};

export default Text;
