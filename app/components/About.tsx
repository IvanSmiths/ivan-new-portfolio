import { FC } from "react";

const About: FC = () => {
  return (
    <main className="my-section">
      <div className="grid">
        <h2 className="heading-large col-span-full md:col-start-2 md:col-end-13">
          Leveraging tech and design, I create websites prioritising aesthetics,
          functionality, speed and usability.
        </h2>
      </div>
      <div className="grid w-full sm:mt-medium mt-28">
        <p className="grid-home-about-p text-primary-light col-start-1 col-end-7 md:col-start-7 md:col-end-10">
          <strong className="text-primary font-bold">
            Adept at translating creative ideas into user-centric and
            data-driven experiences.
          </strong>
          <br />
          <br />
          Having begun my career as a UI/UX Designer, I spent two years in
          creating captivating digital experiences. Upon relocating to Germany,
          I transitioned into the role of a Frontend Developer, where I further
          expanded my expertise in crafting innovative web solutions. Now, in my
          current role as a UI/UX Developer, I seamlessly blend my design
          background with my development skills.
        </p>
      </div>
    </main>
  );
};

export default About;
