interface MenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MenuButton({ isOpen, toggleMenu }: MenuButtonProps) {
  return (
    <button
      onClick={toggleMenu}
      className="bottom-sm right-sm bg-foreground visible fixed z-[22] flex h-10 w-10 flex-col items-center justify-center gap-1 p-3.5 transition md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <div className="relative h-full w-full">
          <span className="bg-background absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 transform transition"></span>
          <span className="bg-background absolute top-1/2 left-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 transform transition"></span>
        </div>
      ) : (
        <>
          <span className="bg-background h-0.5 w-full transition"></span>
          <span className="bg-background h-0.5 w-full transition"></span>
        </>
      )}
    </button>
  );
}
