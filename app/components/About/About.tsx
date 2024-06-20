import { FC } from "react";

const About: FC = async () => {
  return (
    <main data-testid="homeAboutSection" className="mt-large md:mt-section">
      <div className="grid">
        <div className="col-start-1 mt-2 hidden h-2 w-2 rounded-full bg-primary md:block"></div>
        <h2 className="col-start-1 col-end-7 text-3xl sm:text-5xl md:col-start-4 md:col-end-11">
          Leveraging tech and design, I prioritise aesthetics, functionality,
          speed and usability.
        </h2>
        <span className="lato col-start-1 mt-16 hidden sm:mt-medium md:col-start-4 md:block">
          who am i
        </span>
        <div className="col-start-1 col-end-7 mt-16 w-full sm:mt-medium md:col-start-8 md:col-end-12 lg:col-end-11">
          <p className="text-primaryLight">
            <strong className="font-bold text-primary">
              Adept at translating creative ideas into user-centric and
              data-driven experiences.
            </strong>
            <br />
            <br />
            Having begun my career as a UI/UX Designer, I spent two years in
            creating captivating digital experiences. Upon relocating to
            Germany, I transitioned into the role of a Frontend Developer, where
            I further expanded my expertise in crafting innovative web
            solutions. Now, in my current role as a UI/UX Developer, I
            seamlessly blend my design background with my development skills.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
