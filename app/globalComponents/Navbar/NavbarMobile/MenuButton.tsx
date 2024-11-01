interface MenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MenuButton({ isOpen, toggleMenu }: MenuButtonProps) {
  return (
    <button
      onClick={toggleMenu}
      className="visible fixed bottom-small right-small z-40 flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-full bg-dark p-3.5 transition dark:bg-light md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <div className="relative h-full w-full">
          <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-light transition dark:bg-dark"></span>
          <span className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 transform bg-light transition dark:bg-dark"></span>
        </div>
      ) : (
        <>
          <span className="h-0.5 w-full bg-light transition dark:bg-dark"></span>
          <span className="h-0.5 w-full bg-light transition dark:bg-dark"></span>
        </>
      )}
    </button>
  );
}
