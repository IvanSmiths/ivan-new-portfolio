import Text from "./CityInfo/Text";
import Showreel from "./Showreel";

const BottomHero = () => {
  return (
    <div className="gap-xl flex flex-col-reverse justify-between md:flex-row">
      <Text />
      <Showreel />
    </div>
  );
};

export default BottomHero;
