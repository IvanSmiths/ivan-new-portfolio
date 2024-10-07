import { FC } from "react";
import Logo from "../../globalComponents/Logo/Logo";
import Lines from "./Lines";

const Footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      data-cy="footer"
      className="flex min-h-[60vh] flex-col justify-end gap-2 px-small pb-small md:min-h-[80vh] xl:min-h-[100vh]"
    >
      <div className="flex justify-between">
        <span className="lato">Fullstack Developer</span>
        <span className="lato text-right">Ivan Smiths© 2024</span>
      </div>
      <Lines />
      <Logo />
    </footer>
  );
};

export default Footer;
