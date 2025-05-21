import { FC } from "react";

type HeaderProps = {
  h1: string;
  h2: string;
  paragraph: string;
};

const Header: FC<HeaderProps> = ({ h1, h2, paragraph }) => {
  return (
    <section className="mt-2xl pl-sm">
      <h1 className="pb-sm text-6xl">{h1}</h1>
      <div className="mt-medium">
        <h2>{h2}</h2>
        <p className="text-lg md:col-start-9 md:col-end-13">{paragraph}</p>
      </div>
    </section>
  );
};

export default Header;
