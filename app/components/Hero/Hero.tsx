import { FC } from "react";
import Header from "./Header";
import Text from "./Text";
import NavbarWrapper from "../Navbar/NavbarWrapper";

const Hero: FC = () => {
  return (
    <div className="md:min-h-[100vh] flex flex-col">
      <Header />
      <NavbarWrapper />
      <Text />
    </div>
  );
};

export default Hero;
