/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { WorkPage } from "../../../../utils/graphql";
import { RichText } from "@graphcms/rich-text-react-renderer";

type HeaderProps = {
  work: WorkPage;
};

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <>
      <ul className="md:col-start-7 md:col-end-13 col-start-1 col-end-13 mt-medium flex flex-col sm:gap-smallest gap-small">
        <li className="flex max-sm:flex-col max-sm:items-start">
          <span className="w-36 mono">Role:</span>
          <span className="mono">{work.role}</span>
        </li>
        <li className="flex max-sm:flex-col max-sm:items-start">
          <span className="w-36 mono">Date:</span>
          <span className="mono">{work.date}</span>
        </li>
        <li className="flex items-center max-sm:flex-col max-sm:items-start">
          <span className="w-36 mono">Stack:</span>
          <span className="mono w-72">{work.stack}</span>
        </li>
        <li className="flex items-center max-sm:flex-col max-sm:items-start">
          <span className="mono w-36">Links:</span>
          <a
            className="mono underline"
            rel="noopener noreferrer"
            target="_blank"
            href={work.linkedinLink}
          >
            LinkedIn
          </a>
          <a
            className="mono sm:ml-smallest underline"
            rel="noopener noreferrer"
            target="_blank"
            href={work.websiteLink}
          >
            Website
          </a>
        </li>
      </ul>
      <RichText
        // @ts-ignore
        content={work.description.raw}
        renderers={{
          ul: ({ children }) => (
            <ul className="md:col-start-7 md:col-end-12 col-start-1 col-end-13 pl-small mt-medium">
              {children}
            </ul>
          ),
          li: ({ children }) => <li className="list-disc">{children}</li>,
        }}
      />
    </>
  );
};

export default Description;
