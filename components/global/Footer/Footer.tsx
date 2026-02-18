import Logo from "../../home/Hero/TopHero/Logo";
import FooterText from "./FooterText";
import Social from "./Social";

const Footer = () => {
	return (
		<footer className="px-sm pb-sm mt-xl md:mt-5xl flex flex-col justify-end gap-2 md:min-h-[80vh]">
			<Social />
			<FooterText />
			<Logo />
		</footer>
	);
};

export default Footer;
