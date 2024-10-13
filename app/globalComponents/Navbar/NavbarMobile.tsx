"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import MenuButton from "./MenuButton";
import NavMenu from "./NavMenu";

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
      <NavMenu isOpen={isOpen} toggleMenu={toggleMenu} pathname={pathname} />
    </>
  );
}
