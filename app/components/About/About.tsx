import { FC } from "react"

const About: FC = async () => {

  return (
    <main className="md:mt-section mt-large">
      <div className="grid">
        <div className="col-start-1 bg-primary w-2 h-2 rounded-full mt-2 hidden md:block"></div>
        <h2 className="sm:text-5xl text-3xl md:col-start-4 md:col-end-11 col-end-7 col-start-1">
          Leveraging tech and design, I prioritise aesthetics, functionality,
          speed and usability.
        </h2>
        <span className="md:col-start-4 col-start-1 lato sm:mt-medium mt-16 hidden md:block">
          who am i
        </span>
        <div className="w-full md:col-start-8 col-start-1 md:col-end-12 lg:col-end-11 col-end-7 sm:mt-medium mt-16">
          <p className="text-primaryLight">
            <strong className="text-primary font-bold">
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
