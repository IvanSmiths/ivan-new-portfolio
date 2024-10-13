import { FC } from "react";

type HeaderProps = {
  h1: string;
  h2: string;
  paragraph: string;
};

const Header: FC<HeaderProps> = ({ h1, h2, paragraph }) => {
  return (
    <section
      data-testid={`crafts${h1}TitleSection`}
      className="mx-small mt-small md:mt-section"
    >
      <h1 className="text-5xl font-bold uppercase md:text-8xl">{h1}</h1>
      <div className="mt-medium grid !p-0">
        <h2 className="col-span-full text-2xl font-bold md:col-start-1 md:col-end-3">
          {h2}
        </h2>
        <p className="col-span-full text-lg md:col-start-9 md:col-end-13">
          {paragraph}
        </p>
      </div>
    </section>
  );
};

export default Header;
