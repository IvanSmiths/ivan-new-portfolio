import { FC } from "react";
import Header from "./Header";
import Text from "./Text";
import NavbarWrapper from "../Navbar/NavbarWrapper";
import TransitionLink from "../../globalComponents/TransitionLink";

const Hero: FC = () => {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      <NavbarWrapper />
      <TransitionLink href="/works" label="About ->" />
      <Text />
    </div>
  );
};

export default Hero;
