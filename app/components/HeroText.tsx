import { FC } from "react";
import HeroTitle from "./HeroTitle";
import HeroCityInfo from "./HeroCityInfo";

const HeroText: FC = () => {
  return (
    <div className="mt-auto mb-small grid items-end">
      <HeroTitle />
      <HeroCityInfo />
    </div>
  );
};

export default HeroText;
