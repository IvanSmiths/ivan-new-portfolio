import { FC } from "react";

const ButtonLink: FC = () => {
  return (
    <div className="w-28 hidden h-28 md:flex justify-center items-center rounded-full bg-primary cursor-pointer hover:rotate-12 duration-100">
      <span className="text-secondary">See it</span>
    </div>
  );
};

export default ButtonLink;
