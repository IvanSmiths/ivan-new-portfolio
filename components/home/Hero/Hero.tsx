import TopHero from "./TopHero/TopHero";
import BottomHero from "./BottomHero/BottomHero";
import CenterHero from "./CenterHero/CenterHero";

const Hero = () => {
  return (
    <div className="p-sm flex h-[100vh] flex-col justify-between">
      <TopHero />
      <CenterHero />
      <BottomHero />
    </div>
  );
};

export default Hero;
