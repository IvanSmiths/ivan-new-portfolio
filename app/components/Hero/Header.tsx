import { FC } from "react";
import Logo from "../../globalComponents/Logo/Logo";

const Header: FC = () => {
  return (
    <div className="z-20 relative">
      <div className="px-small pt-small flex gap-4 flex-col">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
