import { FC } from "react";
import Logo from "../../globalComponents/Logo/Logo";
import Lines from "./Lines";

const Footer: FC = () => {
  return (
    <footer className="pb-small md:min-h-[80vh] xl:min-h-[100vh] min-h-[60vh] flex flex-col gap-2 justify-end px-small">
      <div className="flex justify-between">
        <span className="lato">UI/UX Developer</span>
        <span className="lato text-right">Ivan Smiths© 2024</span>
      </div>
      <Lines />
      <Logo />
    </footer>
  );
};

export default Footer;
