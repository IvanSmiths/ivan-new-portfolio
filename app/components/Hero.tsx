import { FC } from "react";
import Header from "./Header";
import HeroText from "./HeroText";
import Navbar from "../globalComponents/Navbar";

const Hero: FC = () => {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      <Navbar />
      <HeroText />
    </div>
  );
};

export default Hero;
