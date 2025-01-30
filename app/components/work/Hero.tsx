import { RichText } from "@graphcms/rich-text-react-renderer";
import { FC } from "react";
import Social from "../../globalComponents/Footer/Social";
import { WorkPage } from "../../../utils/graphql/graphqlTypes";

type HeaderProps = {
  work: WorkPage;
};

const Hero: FC<HeaderProps> = ({ work }) => {
  return (
    <header className="mt-small flex flex-col items-center justify-center px-small md:mt-section">
      <h1 className="text-center text-6xl font-thin uppercase md:text-9xl">
        {work.company}
      </h1>
      <h2 className="mt-small text-center text-xl font-thin italic">
        {work.role} - ({work.date})
      </h2>
      <div className="mt-small w-full md:mt-medium md:h-[60rem]">
        <img
          className="h-full w-full rounded-md object-cover"
          src={work.homeImage.url}
          height={work.homeImage.height}
          width={work.homeImage.width}
          alt={work.homeImage.fileName}
        />
      </div>
      <div className="mt-small flex w-full flex-col gap-small transition-all duration-500 md:flex-row">
        <Social label="Website" isInWorkPage link={work.websiteLink} />
        <Social label="LinkedIn" isInWorkPage link={work.linkedinLink} />
      </div>
      <RichText
        content={work.description.raw}
        renderers={{
          p: ({ children }) => (
            <p className="mt-small text-left text-xl md:text-3xl">{children}</p>
          ),
        }}
      />
    </header>
  );
};

export default Hero;
