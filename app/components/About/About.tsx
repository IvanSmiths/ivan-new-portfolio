import { FC } from "react";

const About: FC = async () => {
  return (
    <main
      data-testid="homeAboutSection"
      className="mt-large grid min-h-[100vh] md:mt-section"
    >
      <div className="col-span-full uppercase">
        <div className="flex flex-row flex-wrap items-center justify-between">
          <h2 className="bebas text-[13rem]">I expertly blend</h2>
          <h2 className="bebas text-[13rem]">my</h2>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
};

export default About;
