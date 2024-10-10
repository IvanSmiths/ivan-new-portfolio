import { FC } from "react";
import Logo from "../../globalComponents/Logo/Logo";

const Footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      data-cy="footer"
      className="flex min-h-[60vh] flex-col justify-end gap-2 px-small pb-small md:min-h-[80vh] xl:min-h-[100vh]"
    >
      <Logo />
    </footer>
  );
};

export default Footer;
