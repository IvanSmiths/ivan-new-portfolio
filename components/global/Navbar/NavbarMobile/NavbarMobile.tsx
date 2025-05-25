"use client";

import { useState } from "react";
import MenuButton from "./MenuButton";
import NavMenu from "./NavMenu";

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
      <NavMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
}
