import { FC } from "react";
import Header from "./Header";
import HeroText from "./HeroText";
import NavbarWrapper from "./NavbarWrapper";

const Hero: FC = () => {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      <NavbarWrapper />
      <HeroText />
    </div>
  );
};

export default Hero;
