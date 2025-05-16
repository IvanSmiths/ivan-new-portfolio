import { FC } from "react";
import CityInfo from "./CityInfo";

const Text: FC = () => {
  return (
    <div className="mt-auto w-96">
      <h1 className="text-foreground-muted text-base">
        <strong className="text-foreground font-normal">
          Code Wizard with 4 years of experience️ - Design Alchemist - Turning
          binary code into digital magic.
        </strong>{" "}
        Transforming wild ideas into pixel-perfect realities. Seeking the limit.
      </h1>
      <CityInfo />
    </div>
  );
};

export default Text;
