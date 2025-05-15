import { FC } from "react";
import Logo from "../../global/Logo/Logo";

const Header: FC = () => {
  return (
    <div className="relative z-20">
      <div className="flex flex-col gap-4 px-small pt-small">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
