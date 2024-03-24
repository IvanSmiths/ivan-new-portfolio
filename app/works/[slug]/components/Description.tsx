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
      <ul className="col-start-7 col-end-12 mt-section flex flex-col gap-smallest">
        <li className="flex">
          <span className="w-36 mono">Role:</span>
          <span className="mono">{work.role}</span>
        </li>
        <li className="flex">
          <span className="w-36 mono">Date:</span>
          <span className="mono">{work.date}</span>
        </li>
        <li className="flex">
          <span className="w-36 mono">Stack:</span>
          <span className="mono">{work.stack}</span>
        </li>
        <li className="flex items-center">
          <span className="mono w-36">Links:</span>
          <a
            className="mono"
            rel="noopener noreferrer"
            target="_blank"
            href={work.linkedinLink}
          >
            LinkedIn
          </a>
          <a
            className="mono ml-smallest"
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
            <ul className="col-start-7 col-end-12 pl-small mt-medium">
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
