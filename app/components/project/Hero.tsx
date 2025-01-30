import { FC } from "react";
import Social from "../../globalComponents/Footer/Social";
import { ProjectPage } from "../../../utils/graphql/graphqlTypes";

type HeaderProps = {
  project: ProjectPage;
};

const Hero: FC<HeaderProps> = ({ project }) => {
  return (
    <header className="mt-small flex flex-col items-center justify-center px-small md:mt-section">
      <h1 className="text-center text-6xl font-thin uppercase md:text-9xl lg:px-large">
        {project.project}
      </h1>
      <div className="mt-small w-full md:mt-medium md:h-[60rem]">
        <img
          className="h-full w-full rounded-md object-cover"
          src={project.homeImage.url}
          height={project.homeImage.height}
          width={project.homeImage.width}
          alt={project.homeImage.fileName}
        />
      </div>
      <div className="mt-small flex w-full flex-col gap-small transition-all duration-500 md:flex-row">
        <Social label="Website" isInWorkPage link={project.websiteLink} />
      </div>
      <p className="mt-small text-left text-xl md:text-3xl">
        {project.description}
      </p>
    </header>
  );
};

export default Hero;
