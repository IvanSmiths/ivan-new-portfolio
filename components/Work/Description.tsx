/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Work } from "../../utils/works";

interface HeaderProps {
  work: Work;
}

const Description: FC<HeaderProps> = ({ work }) => {
  return (
    <div className="grid-work-description pt-small flex flex-col gap-small w-full md:sticky md:h-1/5 md:top-1">
      <h1 className="heading-regular font-bold">{work.company}</h1>
      <ul className="pl-small">
        {work.description.map((desc) => (
          <li className="list-disc" key={desc}>
            {desc}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-smallest">
        <li className="paragraph text-primary-light">Role: {work.role}</li>
        <li className="paragraph text-primary-light">Date: {work.date}</li>
        <li className="paragraph text-primary-light">Stack: {work.stack}</li>
      </ul>
      <div className="flex flex-col gap-small pt-medium">
        <a
          className="flex gap-smallest"
          rel="noopener noreferrer"
          target="_blank"
          href={work.linkedin}
        >
          LinkedIn
        </a>
        <a
          className="flex gap-smallest"
          rel="noopener noreferrer"
          target="_blank"
          href={work.website}
        >
          Website
        </a>
      </div>
    </div>
  );
};

export default Description;
