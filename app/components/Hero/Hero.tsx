import { FC } from "react";
import Header from "./Header";
import Text from "./Text";
import NavbarWrapper from "../Navbar/NavbarWrapper";
import Showreel from "./Showreel";
import ShowreelMobile from "./ShowreelMobile";

const Hero: FC = () => {
  return (
    <>
      <div
        data-testid="homeHeroSection"
        className="flex min-h-[100vh] flex-col"
      >
        <Header />
        <NavbarWrapper />
        <div className="block lg:hidden">
          <ShowreelMobile />
        </div>
        <Text />
      </div>
      <div className="hidden lg:block">
        <Showreel />
      </div>
    </>
  );
};

export default Hero;
