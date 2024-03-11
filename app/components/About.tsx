import { FC } from "react";

const About: FC = () => {
  return (
    <main className="mt-section">
      <div className="grid">
        <h2 className="heading-large col-span-full md:col-start-2 md:col-end-13">
          Experienced Frontend Developer with a track record of 3 years in the
          industry. Passionate about crafting innovative web experiences.
        </h2>
      </div>
      <div className="grid w-full sm:mt-medium mt-28">
        <p className="grid-home-about-p col-start-1 col-end-7 md:col-start-7 md:col-end-10">
          Having begun my career as a UI/UX Designer, I spent two years in
          creating captivating digital experiences. Upon relocating to Germany,
          I transitioned into the role of a Frontend Developer, where I further
          expanded my expertise in crafting innovative web solutions. Now, in my
          current role as a UI/UX Developer, I seamlessly blend my design
          background with my development skills.
          <br />
          <br />
          Leveraging my dual expertise, I create user interfaces that not only
          prioritize aesthetics but also prioritize functionality and usability.
        </p>
      </div>
    </main>
  );
};

export default About;
