import Social from "./Social";
import Logo from "../../home/Hero/TopHero/Logo";
import FooterText from "./FooterText";

const Footer = () => {
  return (
    <footer className="px-sm pb-sm md:mt-5xl flex min-h-[60vh] flex-col justify-end gap-2 md:min-h-[80vh]">
      <Social />
      <FooterText />
      <Logo />
    </footer>
  );
};

export default Footer;
