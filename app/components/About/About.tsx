import { FC } from "react";

const About: FC = async () => {
  return (
    <main
      data-testid="homeAboutSection"
      className="mt-large grid min-h-[100vh] md:mt-section"
    >
      <div className="col-span-full uppercase">
        <div className="flex flex-row flex-wrap items-center justify-between gap-small pt-5">
          <h2 className="bebas text-[13rem] leading-[13rem]">
            I expertly blend
          </h2>
          <h2 className="bebas text-[13rem] leading-10">&#x265B;</h2>
          <h2 className="bebas text-[13rem] leading-10">my</h2>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between gap-small bg-primary pt-5">
          <h2 className="bebas text-[13rem] leading-10 text-secondary">
            Design
          </h2>
          <div className="h-3 flex-1 rounded bg-secondary"></div>
          <h2 className="bebas text-[13rem] leading-[13rem] text-secondary">
            Background
          </h2>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between gap-small pt-5">
          <h2 className="bebas text-[13rem] leading-[13rem]">With</h2>
          <h2 className="bebas text-[13rem] leading-[13rem]">~</h2>
          <img
            className="-mt-4 h-40 flex-1 object-cover"
            src="/photo-of-me-about.png"
            alt="photo of me"
          />
          <h2 className="bebas text-[13rem] leading-[13rem]">My</h2>
        </div>
        <div className="bg-brand flex flex-row flex-wrap items-center justify-between gap-small pt-5">
          <h2 className="bebas text-[13rem] leading-[13rem]">Development</h2>
          <h2 className="bebas text-[13rem] leading-10">&#x2731;</h2>
          <h2 className="bebas text-[13rem] leading-10">Mastery</h2>
        </div>
      </div>
    </main>
  );
};

export default About;
