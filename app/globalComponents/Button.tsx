import { FC } from "react";
import Link from "next/link";

type ButtonProps = {
  label: string;
  link: string;
};

const Button: FC<ButtonProps> = ({ label, link }: ButtonProps) => {
  return (
    <div className="group flex cursor-pointer items-center justify-center gap-8 rounded-md border-2 border-dark px-6 py-3 transition hover:bg-dark dark:border-light dark:hover:bg-light">
      <Link
        className="text-1xl transition group-hover:text-light dark:group-hover:text-dark"
        href={link}
      >
        {label}
      </Link>
    </div>
  );
};

export default Button;
