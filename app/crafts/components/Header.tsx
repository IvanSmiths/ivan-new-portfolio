import { FC } from "react";

type HeaderProps = {
  h1: string;
  h2: string;
  paragraph: string;
};

const Header: FC<HeaderProps> = ({ h1, h2, paragraph }) => {
  return (
    <section className="mx-small mt-section">
      <h1 className="text-8xl uppercase">{h1}</h1>
      <div className="mt-medium grid !p-0">
        <h2 className="lato col-start-1 col-end-3">{h2}</h2>
        <p className="col-start-9 col-end-13">{paragraph}</p>
      </div>
    </section>
  );
};

export default Header;
