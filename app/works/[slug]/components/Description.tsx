/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Work } from "../page";
import { RichText } from "@graphcms/rich-text-react-renderer";

type HeaderProps = {
  work: Work;
};

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <div className="grid-work-description pt-medium flex flex-col gap-small w-full md:sticky md:h-fit md:top-1">
      <h1 className="heading-regular font-bold">{work.company}</h1>
      <RichText
        // @ts-ignore
        content={work.description.raw}
        renderers={{
          ul: ({ children }) => <ul className="pl-small">{children}</ul>,
          li: ({ children }) => <li className="list-disc">{children}</li>,
        }}
      />

      <ul className="flex flex-col gap-smallest">
        <li className="paragraph text-primary-light">Role: {work.role}</li>
        <li className="paragraph text-primary-light">Date: {work.date}</li>
        <li className="paragraph text-primary-light">Stack: {work.stack}</li>
      </ul>
      <div className="flex flex-col gap-small pt-small">
        <a
          className="flex gap-smallest"
          rel="noopener noreferrer"
          target="_blank"
          href={work.linkedinLink}
        >
          LinkedIn
          <img
            src="/icons/arrow.svg"
            width="20px"
            height="20px"
            loading="lazy"
            alt="arrow"
          />
        </a>
        <a
          className="flex gap-smallest"
          rel="noopener noreferrer"
          target="_blank"
          href={work.websiteLink}
        >
          Website
          <img
            src="/icons/arrow.svg"
            width="20px"
            height="20px"
            loading="lazy"
            alt="arrow"
          />
        </a>
      </div>
    </div>
  );
};

export default Description;