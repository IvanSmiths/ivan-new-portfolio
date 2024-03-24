/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { WorkPage } from "../../../../utils/graphql";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Arrow from "./Arrow";

type HeaderProps = {
  work: WorkPage;
};

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <div className="md:col-start-1 md:col-end-6 col-start-1 col-end-7 pt-medium flex flex-col gap-small w-full md:sticky md:h-fit md:top-1">
      <h1 className="text-3xl font-bold">{work.company}</h1>
      <RichText
        // @ts-ignore
        content={work.description.raw}
        renderers={{
          ul: ({ children }) => <ul className="pl-small">{children}</ul>,
          li: ({ children }) => <li className="list-disc">{children}</li>,
        }}
      />
      <ul className="flex flex-col gap-smallest">
        <li className="text-primary-light">Role: {work.role}</li>
        <li className="text-primary-light">Date: {work.date}</li>
        <li className="text-primary-light">Stack: {work.stack}</li>
      </ul>
      <div className="flex flex-col gap-small pt-small">
        <a
          className="flex gap-smallest items-center"
          rel="noopener noreferrer"
          target="_blank"
          href={work.linkedinLink}
        >
          LinkedIn
          <Arrow />
        </a>
        <a
          className="flex gap-smallest items-center"
          rel="noopener noreferrer"
          target="_blank"
          href={work.websiteLink}
        >
          Website
          <Arrow />
        </a>
      </div>
    </div>
  );
};

export default Description;
