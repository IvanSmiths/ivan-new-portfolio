import { FC } from "react";
import CityInfo from "./CityInfo";

const Text: FC = () => {
  return (
    <div className="mt-auto w-96">
      <h1 className="text-foreground-muted text-base">
        <strong className="text-foreground font-normal">
          {" "}
          Fullstack Developer with 3 years of experience. More text will be
          added here. Less important text{" "}
        </strong>{" "}
        there will be here. Seeking the limit.
      </h1>
      <CityInfo />
    </div>
  );
};

export default Text;
