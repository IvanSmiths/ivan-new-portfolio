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
      <ul className="md:col-start-7 md:col-end-13 col-span-full mt-medium flex flex-col gap-small">
        <li>Role: {work.role}</li>
        <li>Date: {work.date}</li>
        <li>Stack: {work.stack}</li>
        <li>
          Links: {""}
          <a
            className="underline underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
            href={work.linkedinLink}
          >
            LinkedIn
          </a>
          <a
            className="sm:ml-smallest underline underline-offset-4"
            rel="noopener noreferrer"
            target="_blank"
            href={work.websiteLink}
          >
            Website
          </a>
        </li>
      </ul>
      <RichText
        content={work.description.raw}
        renderers={{
          ul: ({ children }) => (
            <ul className="md:col-start-7 md:col-end-12 col-span-full pl-small mt-medium">
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
