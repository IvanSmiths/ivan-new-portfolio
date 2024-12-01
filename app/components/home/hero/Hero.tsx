import { FC } from "react";
import Header from "./Header";
import Text from "./Text";
import NavbarWrapper from "../navbar/NavbarWrapper";
import Showreel from "./Showreel";
import ShowreelMobile from "./ShowreelMobile";

const Hero: FC = () => {
  return (
    <>
      <div data-testid="homeHeroSection" className="flex h-[100vh] flex-col">
        <Header />
        <NavbarWrapper />
        <div className="flex-grow lg:hidden">
          <ShowreelMobile />
        </div>
        <Text />
      </div>
      <div className="hidden w-full lg:block">
        <Showreel />
      </div>
    </>
  );
};

export default Hero;
