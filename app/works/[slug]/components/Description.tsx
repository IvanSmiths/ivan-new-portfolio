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
        <li className="mono">Role: {work.role}</li>
        <li className="mono">Date: {work.date}</li>
        <li className="mono">Stack: {work.stack}</li>
        <li className="flex gap-smallest items-center">
          <span className="mono">Links:</span>
          <a
            className="mono"
            rel="noopener noreferrer"
            target="_blank"
            href={work.linkedinLink}
          >
            LinkedIn
          </a>
          <a
            className="mono"
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
            <ul className="col-start-7 col-end-12 pl-small">{children}</ul>
          ),
          li: ({ children }) => <li className="list-disc">{children}</li>,
        }}
      />
    </>
  );
};

export default Description;
