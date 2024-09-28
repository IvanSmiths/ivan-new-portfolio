import { FC } from "react";
import Header from "./Header";
import Text from "./Text";
import NavbarWrapper from "../Navbar/NavbarWrapper";
import Showreel from "./Showreel";

const Hero: FC = () => {
  return (
    <div data-testid="homeHeroSection" className="flex min-h-[100vh] flex-col">
      <Header />
      <NavbarWrapper />
      <Text />
      <Showreel />
    </div>
  );
};

export default Hero;
