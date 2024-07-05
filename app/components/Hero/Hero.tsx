import { FC } from "react";
import Header from "./Header";
import Text from "./Text";
import NavbarWrapper from "../Navbar/NavbarWrapper";

const Hero: FC = () => {
  return (
    <div data-testid="homeHeroSection" className="flex min-h-[97vh] flex-col">
      <Header />
      <NavbarWrapper />
      <Text />
    </div>
  );
};

export default Hero;
